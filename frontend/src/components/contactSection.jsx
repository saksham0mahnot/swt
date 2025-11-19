// import { Typography, Card, Form, Input, Button, message } from "antd";
// import api from "../api/api";

// const { Title, Paragraph } = Typography;
// const { TextArea } = Input;

// export default function ContactSection() {
//   const onFinish = (values) => {
//     console.log("Received values:", values);
//     //Here you would typically send the form data to your backend
//     message.success("Message sent successfully!");
//   };

//   return (
//     <section
//       id="contact"
//       className="py-16 mx-4 px-4 my-4 bg-white rounded-2xl shadow-xl"
//     >
//       <div className="container mx-auto px-4">
//         <Title level={2} className="text-center mb-8">
//           Contact Us
//         </Title>
//         <div className="max-w-4xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <Paragraph className="text-lg mb-6">
//                 Have questions or need assistance with your travel plans? Our
//                 team is here to help! Fill out the form and we'll get back to
//                 you as soon as possible. 
//               </Paragraph>
//               <Card className="mb-6">
//                 <Title level={4}>Our Office</Title>
//                 <Paragraph>Christ University Delhi NCR</Paragraph>
//                 <Paragraph>Mariam Nagar, Ghaziabad</Paragraph>
//                 <Paragraph>Uttar Pradesh 201003</Paragraph>
//               </Card>
//               <Card>
//                 <Title level={4}>Contact Information</Title>
//                 <Paragraph>Email: skipwithtrips@gmail.com</Paragraph>
//                 <Paragraph>Phone: +91 8527958951</Paragraph>
//               </Card>
//             </div>
//             <div>
//               <Card>
//                 <Form layout="vertical" onFinish={onFinish}>
//                   <Form.Item
//                     name="name"
//                     label="Name"
//                     rules={[
//                       { required: true, message: "Please enter your name" },
//                     ]}
//                   >
//                     <Input placeholder="Your name" />
//                   </Form.Item>
//                   <Form.Item
//                     name="email"
//                     label="Email"
//                     rules={[
//                       {
//                         required: true,
//                         type: "email",
//                         message: "Please enter a valid email",
//                       },
//                     ]}
//                   >
//                     <Input placeholder="Your email" />
//                   </Form.Item>
//                   <Form.Item
//                     name="subject"
//                     label="Subject"
//                     rules={[
//                       { required: true, message: "Please enter a subject" },
//                     ]}
//                   >
//                     <Input placeholder="Subject" />
//                   </Form.Item>
//                   <Form.Item
//                     name="message"
//                     label="Message"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please enter your message",
//                       },
//                     ]}
//                   >
//                     <TextArea rows={4} placeholder="Your message" />
//                   </Form.Item>
//                   <Form.Item>
//                     <Button
//                       type="primary"
//                       htmlType="submit"
//                       className="!bg-gradient-to-r !from-orange-600 !to-red-600 !to-orange-600 !border-none !shadow-lg hover:!shadow-xl !rounded-xl !px-6 sm:!px-8 !py-2 !h-10 sm:!h-12 !text-sm sm:!text-base !font-semibold !text-white hover:!scale-105 !transition-all !duration-300 relative overflow-hidden group"
//                     >
//                       Send Message
//                       <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                       <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                     </Button>
//                   </Form.Item>
//                 </Form>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
