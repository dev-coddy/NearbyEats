import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Thanks for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-[600px] mx-auto my-12 p-8 bg-white rounded-[10px] shadow-lg text-center">
      <h1 className="text-2xl text-black ">Contact Us</h1>
      <p>
        We’d love to hear from you! Fill out the form below and we’ll get back
        to you shortly.
      </p>

      <form
        className="flex flex-col gap-4 w-full max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="px-4 py-3 border border-gray-300 rounded-md text-base outline-none focus:border-[#ff6b6b]"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="px-4 py-3 border border-gray-300 rounded-md text-base outline-none focus:border-[#ff6b6b]"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          className="px-4 py-3 border border-gray-300 rounded-md text-base outline-none focus:border-[#ff6b6b]"
        ></textarea>
        <button
          type="submit"
          className="bg-[#ff6b6b] text-white px-4 py-3 rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-[#e85b5b]"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
