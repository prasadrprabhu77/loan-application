import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    // Here you can connect to backend or Firebase for storing contact messages
    console.log("Message submitted:", form);

    setSuccess("Your message has been sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h1>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Have questions or need assistance? We’re here to help!  
        Fill out the form below, and our support team will get back to you soon.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 space-y-5"
      >
        {error && <p className="text-red-600 font-medium">{error}</p>}
        {success && <p className="text-green-600 font-medium">{success}</p>}

        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>

      {/* Contact Info Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-2">📍 Address: 123 Finance Street, Bengaluru, India</p>
        <p className="text-gray-700 mb-2">📞 Phone: +91 98765 43210</p>
        <p className="text-gray-700">✉️ Email: support@quickloan.com</p>
      </div>
    </div>
  );
};

export default Contact;
