import React from "react";
import { useSEO } from "../hooks/useSEO";

const Contact: React.FC = () => {
  useSEO({
    title: "Contact | Believers Temple AG",
    description: "Get in touch with Believers Temple AG in Accra for inquiries and prayer requests.",
    image: "/images/contact-placeholder.jpg",
  });

  return (
    <div className="py-12 px-8 text-center">
      <h3 className="text-3xl font-semibold text-blue-700 mb-6">Contact Us</h3>
      <p className="max-w-2xl mx-auto text-gray-700 mb-4">
        Have questions or prayer requests? We’d love to hear from you.
      </p>
      <p>Email: believers.temple.ag@gmail.com</p>
      <p>Phone: +233 55 123 4567</p>
      <p>Address: Believers Temple AG, Accra, Ghana</p>
      <img src="/images/contact-placeholder.jpg" alt="Contact" className="mx-auto mt-8 w-96 h-64 object-cover rounded shadow" />
    </div>
  );
};

export default Contact;
