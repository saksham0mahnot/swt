import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/termsNconditions";
import ContactUs from "../pages/contactUs";
import AboutSection from "../components/aboutSection";
import GenZtrip from "../pages/genz_trip";
import ComingSoon from "../components/comingSoon";
import RagistrationForm from "../components/genZ_trip/registrationPage";
import CheckoutPage from "../components/genZ_trip/checkoutPage";
import ProtectedRoute from "../components/protectedRoute";
import BookingConfirm from "../components/genZ_trip/booking_confirm";
import MyBooking from "../components/myBooking";
import MyProfile from "../components/myProfile";
import EditProfile from "../components/editProfile";

function PrototypePage() {
  const navigate = useNavigate();
  return (
    <div className="w-screen bg-black">
      <div className="fixed top-0 inset-x-0 z-[1000] bg-gradient-to-r from-orange-600 via-rose-500 to-pink-600 text-white shadow-md rounded-b-2xl">
        <div className="max-w-screen-xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap text-center md:text-left">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs md:text-sm font-semibold tracking-wide uppercase">Portfolio Demo</span>
            <p className="text-sm md:text-base font-medium">I completed an internship building this site. The live site is currently not available at <span className="font-semibold underline decoration-white/60 ml-1">skipwithtrip.com</span>.</p>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs md:text-sm font-semibold no-underline !text-white visited:!text-white hover:!text-white focus:!text-white bg-white/10 backdrop-blur-sm ring-1 ring-white/40 shadow-sm transition duration-200 ease-out hover:bg-white/20 hover:ring-white/80 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
              aria-label="Open Visual/Code link"
            >
              Visual / Code
            </a>
            <a
              href="/prototype"
              onClick={(e) => { e.preventDefault(); navigate('/prototype'); }}
              className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs md:text-sm font-semibold no-underline !text-white visited:!text-white hover:!text-white focus:!text-white bg-white/10 backdrop-blur-sm ring-1 ring-white/40 shadow-sm transition duration-200 ease-out hover:bg-white/20 hover:ring-white/80 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
              aria-label="Open Prototype/Figma link"
            >
              Prototype / Figma
            </a>
          </div>
        </div>
      </div>
      <div className="h-12 md:h-14"></div>
      <iframe
        title="Figma Prototype"
        className="w-full h-[calc(100vh-48px)] md:h-[calc(100vh-56px)]"
        style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
        src="https://embed.figma.com/design/AufjZV9u90vMWhPUw5yF8V/SWT-Prototype-Designs?node-id=0-1&embed-host=share"
        allowFullScreen
      />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms_and_conditions" element={<TermsConditions />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/about_us" element={<AboutSection />} />
        <Route path="/genZtrip" element={<GenZtrip />} />
        <Route path="/coming_soon" element={<ComingSoon />} />
        <Route path="/register" element={<CheckoutPage />} />
        <Route path="/bookingConfirm" element={<BookingConfirm />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route
          path="/traveler_form"
          element={
            <ProtectedRoute>
              <RagistrationForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Route>
      <Route path="/prototype" element={<PrototypePage />} />
    </Routes>
  );
}
