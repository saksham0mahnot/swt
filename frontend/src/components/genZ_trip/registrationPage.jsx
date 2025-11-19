import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  Button,
  Table,
  message,
  InputNumber,
  Select,
  Avatar,
  Upload,
  Modal,
} from "antd";
import {
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  BellFilled,
  BellOutlined,
  UploadOutlined,
} from "@ant-design/icons";
// import BillDetailsPopup from "./billDetails";
import api from "../../api/api";
import { useLocation, useNavigate } from "react-router-dom";

const { Option } = Select;

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [travelers, setTravelers] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    age: null,
    gender: "",
    idProof: "",
    uploadedFile: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [count, setCount] = useState(1);
  const [countError, setCountError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const travelerInputRef = useRef(null);

  const [bookingSummary, setBookingSummary] = useState({
    finalAmount: 0,
    discount: 0,
    coupon: "",
    initialPrice: 0,
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFormData((prev) => ({
          ...prev,
          fullName: parsedUser.name || "",
          email: parsedUser.email || "",
          mobile: parsedUser.phone_number || "",
        }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Retrieve booking summary from navigation state
    if (location.state) {
      setBookingSummary(location.state);
    } else {
      // If no state is passed, maybe redirect back or show an error
      message.error(
        "Booking details not found. Please start from the checkout page."
      );
      navigate("/register"); // Redirect to checkout if details are missing
    }
  }, [location.state, navigate]);

  const handleSubmit = async () => {
    if (travelers.length === 0) {
      message.error("Please add at least one traveler");
      return;
    }

    try {
      setSubmitting(true);

      // First validate the coupon if present
      let couponDiscount = 0;
      if (bookingSummary.coupon) {
        const couponResponse = await api.post("/api/web/validateCoupon", {
          couponCode: bookingSummary.coupon.trim().toUpperCase()
        });
        if (!couponResponse.data.isValid) {
          throw new Error("Invalid coupon code");
        }
        couponDiscount = couponResponse.data.discount;
      }

      // Create bookings with consistent case for coupon
      const bookingResponses = await Promise.all(
        travelers.map((traveler, index) => {
          const bookingData = {
            user_id: Math.round(Math.random() * 1000000),
            full_name: traveler.fullName,
            email: traveler.email,
            contact_number: traveler.mobile,
            id_proof: traveler.idProof,
            gender: traveler.gender,
            age: traveler.age,
            uploaded_file: traveler.uploadedFile?.serverPath || null, // Use server file path
            agent_id: null,
            from_location: "Delhi",
            to_location: "Manali",
            start_date: "2025-08-13",
            end_date: "2025-08-17",
            total_passengers: count,
            adults: count,
            children: 0,
            elders: 0,
            pet: false,
            amount: bookingSummary.finalAmount * count,
            discount: bookingSummary.discount * count,
            coupon: bookingSummary.coupon || null,
            referral: null,
            customer_request: null,
          };

          console.log(`Booking payload for traveler ${index + 1}:`, bookingData);
          
          return api.post("/api/web/createBooking", bookingData)
            .then(response => {
              console.log(`Booking response for traveler ${index + 1}:`, response.data);
              // Don't show booking confirmation here - wait for payment success
              return response;
            })
            .catch(error => {
              console.error(`Booking error for traveler ${index + 1}:`, {
                error: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: error.config
              });
              throw error;
            });
        })
      );
      const bookingIds = bookingResponses.map(
        (response) => response.data.bookingId
      );

      // Create payment order
      const orderResponse = await api.post("/api/web/payment/createOrder", {
        amount: bookingSummary.finalAmount * count,
        receipt: `booking_${Date.now()}`,
      });

      const { order } = orderResponse.data;
      if (!order) throw new Error("Failed to create payment order.");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "SkipWithTrips",
        description: "GenZ Trip Booking",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verificationResponse = await api.post(
              "/api/web/payment/verifyPayment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingIds: bookingIds, // Pass booking IDs to update
              }
            );

            if (verificationResponse.data.status) {
              // Confirm bookings after successful payment
              await Promise.all(
                bookingIds.map(async (bookingId) => {
                  try {
                    const confirmResponse = await api.post(
                      `/api/web/confirm/${bookingId}`,
                      {
                        paymentId: response.razorpay_payment_id
                      }
                    );
                    console.log(`Booking ${bookingId} confirmed:`, confirmResponse.data);
                  } catch (error) {
                    console.error(`Failed to confirm booking ${bookingId}:`, error);
                    message.error(`Failed to confirm booking ${bookingId}`);
                  }
                })
              );

              // Fetch booking details to show status
              const bookingDetails = await api.get(`/api/web/my?email=${travelers[0].email}`);
              const confirmedBookings = bookingDetails.data.filter(
                booking => booking.status === 'confirmed'
              );

              if (confirmedBookings.length === bookingIds.length) {
                message.success("Payment successful! Bookings confirmed.");
              } else {
                message.warning("Payment successful. Some bookings pending confirmation.");
              }
              navigate("/register");
              // setShowBillPopup(true);
            } else {
              message.error("Payment verification failed.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            message.error("Payment verification failed.");
          }
        },
        prefill: {
          name: travelers[0]?.fullName || "",
          email: travelers[0]?.email || "",
          contact: travelers[0]?.mobile || "",
        },
        theme: { color: "#FF6E2F" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", (resp) => {
        message.error(`Payment failed: ${resp.error.description}`);
      });
    } catch (error) {
      console.error("Detailed booking error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      
      if (error.response?.data?.message) {
        message.error(`Booking failed: ${error.response.data.message}`);
      } else {
        message.error("Failed to complete booking. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // File upload handler
  const handleFileUpload = (info) => {
    const { status } = info.file;
    if (status === "uploading") {
      // Show uploading state
      setFormData((prev) => ({
        ...prev,
        uploadedFile: {
          ...info.file,
          status: "uploading",
        },
      }));
    } else if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      // Extract file path from backend response
      const filePath = info.file.response?.path || info.file.response?.filename;
      setFormData((prev) => ({
        ...prev,
        uploadedFile: {
          ...info.file,
          serverPath: filePath,
          status: "done",
        },
      }));
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
      setFormData((prev) => ({ ...prev, uploadedFile: null }));
    }
  };

  const uploadProps = {
    name: "file",
    action: `${import.meta.env.VITE_API_BASE_URL}/api/web/upload`, // Fixed endpoint URL
    onChange: handleFileUpload,
    beforeUpload: (file) => {
      const isValidSize = file.size / 1024 / 1024 < 5; // 5MB limit
      const isValidType = [
        "image/jpeg",
        "image/png",
        "application/pdf",
      ].includes(file.type);

      if (!isValidSize) {
        message.error("File must be smaller than 5MB!");
        return false;
      }
      if (!isValidType) {
        message.error("Only JPG, PNG, and PDF files are allowed!");
        return false;
      }

      return true; // Allow actual upload
    },
    onRemove: () => {
      setFormData((prev) => ({ ...prev, uploadedFile: null }));
    },
    fileList: formData.uploadedFile ? [formData.uploadedFile] : [],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNumberChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Pre-fill form with user data if available
        setFormData((prevData) => ({
          ...prevData,
          fullName: parsedUser.name || "",
          email: parsedUser.email || "",
          mobile: parsedUser.phone || "",
        }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const validateForm = () => {
    const { fullName, mobile, email, age, gender, idProof } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const idProofRegex = /^\d{4}\s?\d{4}\s?\d{4}$/;
    const errors = {};

    if (!fullName) errors.fullName = "Full name is required.";
    if (!mobile) errors.mobile = "Mobile number is required.";
    else if (!phoneRegex.test(mobile))
      errors.mobile = "Invalid Indian mobile number.";
    if (!email) errors.email = "Email is required.";
    else if (!emailRegex.test(email)) errors.email = "Invalid email address.";
    if (!age) errors.age = "Age is required.";
    else if (age < 1 || age > 100)
      errors.age = "Age must be between 1 and 100.";
    if (!gender) errors.gender = "Gender is required.";
    if (!idProof || idProof.trim() === "") {
      errors.idProof = "ID Proof is required.";
    } else if (!idProofRegex.test(idProof)) {
      errors.idProof = "Invalid ID Proof format. Please enter a valid ID number.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addTraveler = () => {
    if (count === 0) {
      setCountError(
        "Please enter the number of travellers before adding a member."
      );
      travelerInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    } else {
      setCountError("");
    }

    if (travelers.length >= count) {
      setCountError(`You can only add ${count} traveller(s).`);
      travelerInputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    if (!validateForm()) {
      const errorFields = Object.keys(formErrors).join(', ');
      message.error(`Please fill all required fields: ${errorFields}`);
      return;
    }

    setTravelers([...travelers, formData]);
    setFormData({
      fullName: "",
      mobile: "",
      email: "",
      age: null,
      gender: "",
      idProof: "", // Set to empty string instead of null
      uploadedFile: null,
    });
    message.success("Traveler added successfully!");
  };

  const removeTraveler = (index) => {
    const updated = travelers.filter((_, i) => i !== index);
    setTravelers(updated);
    message.info("Traveler removed.");
  };

  const handleEdit = (index) => {
    setFormData(travelers[index]);
    removeTraveler(index);
  };
  const handleBack = () => {
    window.history.back();
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => (
        <>
          <UserOutlined className="mr-2 text-lg" />
          {text}
        </>
      ),
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "ID Proof",
      dataIndex: "idProof",
      key: "idProof",
    },
    {
      title: "Document",
      dataIndex: "uploadedFile",
      key: "uploadedFile",
      render: (file) =>
        file ? (
          <span className="text-green-600 text-sm">✓ {file.name}</span>
        ) : (
          <span className="text-gray-400 text-sm">No file</span>
        ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, __, index) => (
        <EditOutlined
          className="cursor-pointer text-blue-500 text-lg hover:scale-105"
          onClick={() => handleEdit(index)}
        />
      ),
    },
    {
      title: "Remove",
      key: "remove",
      render: (_, __, index) => (
        <DeleteOutlined
          className="cursor-pointer text-red-500"
          onClick={() => removeTraveler(index)}
        />
      ),
    },
  ];

  return (
    <div className=" min-h-screen bg-[#FFDBCC] pb-20">
      {/* Back Button */}
      <div
        className="relative pt-10 px-10 flex items-center text-black gap-2"
        onClick={handleBack}
      >
        <ArrowLeftOutlined className="cursor-pointer text-2xl" />
        <span className="text-2xl font-medium cursor-pointer">Checkout</span>
      </div>

      {/* User Info - Only show if user is logged in */}
      {user && (
        <div className="relative  mt-8 mx-auto w-[90%] max-w-6xl flex items-center gap-4 text-black rounded-lg">
          <Avatar
            size={60}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
          >
            {user.name ? user.name.charAt(0).toUpperCase() : <UserOutlined />}
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">
              Hello {user.name || "User"}!
            </h2>
            <p className="text-base">
              {user.phone_number || "No phone number"}
            </p>
          </div>
          <div className="ml-auto">
            <Button
              shape="circle"
              icon={<BellOutlined style={{ fontSize: 25, color: "orange" }} />}
              size="large"
              style={{
                width: 64,
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
                border: "2px solid transparent",
                fontSize: 25,
                transition: "border-color 0.2s",
                padding: 0,
              }}
              className="hover:!border-orange-300"
            />
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-4xl  shadow-xl mx-auto max-w-5xl mt-20 ">
        <div className="  text-center rounded-t-4xl  px-6 md:px-10 py-8 mx-auto max-w-5xl bg-[#E6D4D4]">
          <h2 className="text-4xl max-[600px]:text-2xl font-medium text-black pb-5">
            Claim Your Spot, Explorer 🚀
          </h2>
          <p className="text-gray-700 text-base text-2xl mb-6">
            Complete the process and enter the correct details below.
          </p>
          <div className="w-full flex justify-center">
            <div className="flex items-center justify-between bg-white rounded-xl px-6 py-3 shadow-sm max-w-2xl w-full mb-8 max-[415px]:flex-col">
              <div className="flex items-center gap-3">
                <UserOutlined className="text-xl text-black rounded-full p-1.5 max-[415px]:mb-2" />
                <span className="text-base font-medium text-black w-50 max-[415px]:mb-2">
                  Number of Travellers
                </span>
              </div>

              <div
                ref={travelerInputRef}
                className={`transition-all duration-300 ${
                  countError ? "shake" : ""
                }`}
              >
                <Input
                  value={count}
                  type="number"
                  min={1}
                  max={10}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setCount(val);
                  }}
                  className={`!w-36 max-[485px]:!w-22 max-[415px]:!w-40 !ml-50 max-[690px]:!ml-0 text-center text-black !bg-gray-200 !rounded-md cursor-default border ${
                    countError ? "!border-red-500 !border-2" : "border-gray-300"
    }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Traveler Form */}
        <div className="text-black w-full px-6 md:px-10 py-8 bg-[#FBFBFB] rounded-b-4xl">
          <div className="text-left mb-4 font-medium text-gray-700 !text-2xl px-6">
            Enter the correct details below:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8 px-15">
            {/* Full Name Field */}
            <div className="flex text-base flex-col">
              <label className="font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className={`h-12 text-base ${
                  formErrors.fullName ? "border-red-500" : ""
                }`}
              />
              {formErrors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.fullName}
                </p>
              )}
            </div>

            {/* Mobile Field */}
            <div className="flex text-base flex-col">
              <label className="font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <Input
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                className={`!p-1 text-base ${
                  formErrors.mobile ? "border-red-500" : ""
                }`}
                addonBefore={
                  <span role="img" aria-label="Indi">
                    🇮🇳 +91
                  </span>
                }
                onChange={handleChange}
              />
              {formErrors.mobile && (
                <p className="text-red-500 text-xs mt-1">{formErrors.mobile}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="flex text-base flex-col">
              <label className="font-medium text-gray-700 mb-1">E-mail</label>
              <Input
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className={`h-12 text-base ${
                  formErrors.email ? "border-red-500" : ""
                }`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Age Field - Using InputNumber */}
            <div className="flex text-base flex-col">
              <label className="font-medium text-gray-700 mb-1">Age</label>
              <InputNumber
                min={1}
                max={100}
                value={formData.age}
                onChange={(value) => handleNumberChange(value, "age")}
                className={`!p-1.5 text-base justify-center ${
                  formErrors.age ? "border-red-500" : ""
                }`}
                placeholder="Age"
              />
              {formErrors.age && (
                <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>
              )}
            </div>

            {/* Gender Field - Using Select */}
            <div className="flex text-base flex-col">
              <label className="font-medium text-gray-700 mb-1">Gender</label>
              <Select
                placeholder="Select Gender"
                value={formData.gender || undefined}
                onChange={(value) => handleSelectChange(value, "gender")}
                className={`h-12 text-base ${
                  formErrors.gender ? "border-red-500" : ""
                }`}
                size="large"
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
                <Option value="Prefer not to say">Prefer not to say</Option>
              </Select>
              {formErrors.gender && (
                <p className="text-red-500 text-xs mt-1 w-full">
                  {formErrors.gender}
                </p>
              )}
            </div>

            {/* ID Proof Field */}
            <div className="flex text-base flex-col">
              <label className="font-medium text-gray-700 mb-1">
                ID Proof (Aadhaar)
              </label>
              <Input
                name="idProof"
                placeholder="XXXX XXXX XXXX"
                value={formData.idProof}
                onChange={handleChange}
                className={`h-12 text-base ${
                  formErrors.idProof ? "border-red-500" : ""
                }`}
              />
              {formErrors.idProof && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.idProof}
                </p>
              )}
            </div>

            {/* File Upload Field */}
            <div className="flex text-base flex-col">
              <label className="font-medium text-gray-700 mb-1">
                Upload ID Document
              </label>
              <Upload {...uploadProps} maxCount={1}>
                <Button
                  icon={<UploadOutlined />}
                  className="h-12 w-full text-base flex items-center justify-center"
                >
                  Click to Upload
                </Button>
              </Upload>
              {formData.uploadedFile && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-700">
                    ✓ Uploaded: {formData.uploadedFile.name}
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Upload JPG, PNG, or PDF (Max 5MB)
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center mb-12">
            <Button
              className="!border-orange-500 hover:!bg-orange-100 hover:!text-orange-500 !rounded-2xl !text-base !font-normal !py-4.5 !px-8 !shadow-md !cursor-pointer"
              onClick={addTraveler}
            >
              Add member
            </Button>
            {countError && (
              <p className="text-red-500 text-sm mt-2 text-center max-w-md">
                {countError}
              </p>
            )}
          </div>

          {travelers.length > 0 && (
            <>
              <div className="font-semibold mb-4 text-gray-700 !text-2xl">
                Details of the Travellers:
              </div>
              <div className="overflow-x-auto">
                <Table
                  columns={columns}
                  dataSource={travelers.map((t, i) => ({ ...t, key: i }))}
                  pagination={false}
                  bordered
                />
              </div>

              <div className="flex justify-center mt-10 mb-10">
                <Button
                  type="primary"
                  className="!bg-red-500 hover:!bg-red-600 px-8 text-white !text-lg rounded-2xl !py-5 !px-8 shadow-md cursor-pointer"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
