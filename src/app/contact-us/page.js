"use client";
import { useState } from "react";
import { MailOpen } from 'lucide-react';
import * as Toast from "@radix-ui/react-toast";

function RegisterPage() {
    const input =
        "w-full px-3 py-2 bg-transparent border-b-2 border-[#F0ECEC] text-white text-sm outline-none";
    const label = "text-white font-bold text-sm mb-1 block";
    const button =
       "w-full px-3 py-2 bg-[#FF8C00] text-white rounded-full font-bold hover:bg-[#FFA500] hover:shadow-[0_0_10px_rgba(255,140,0,0.5)] transition-all duration-300 transform hover:scale-[1.02]";

    const form =
        "flex-1 flex flex-col items-center p-6 sm:p-4 lg:p-8 sm:w-full lg:w-1/2";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [openToast, setOpenToast] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) {
            formErrors.name = "Name is required.";
        } else if (formData.name.length < 2) {
            formErrors.name = "Name must be at least 2 characters.";
        }
        if (!formData.email) {
            formErrors.email = "Email is required.";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            formErrors.email = "Invalid email address.";
        }
        if (!formData.contactNumber) {
            formErrors.contactNumber = "Contact number is required.";
        } else if (!/^[+]?[0-9]+$/.test(formData.contactNumber)) {
            formErrors.contactNumber = "Invalid phone number.";
        }
        if (!formData.message) {
            formErrors.message = "Message is required.";
        } else if (formData.message.length < 10) {
            formErrors.message = "Message must be at least 10 characters.";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setOpenToast(true);
            setFormData({ name: "", email: "", contactNumber: "", message: "" });
            setErrors({});
        } else {
            setOpenToast(false);
        }
    };

    return (
        <div className="flex flex-col font-sans bg-[#1A1A22] min-h-screen">
            <div className="flex flex-1 flex-col lg:flex-row">
                {/* Left Side */}
                
                 
                    <div className="absolute top-0 right-0 w-full h-full z-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="asbolute w-full h-full"
                        >
                            <polygon
                                points="77.5,0 85,0 65,100 55,100"
                                fill="rgba(255, 140, 0, 0.15)"
                            />
                            <polygon
                                points="90,0 100,0 80,100 70,100"
                                fill="rgba(255, 140, 0, 0.15)"
                            />
                        </svg>
                    </div>
           

                {/* Right Side */}
                {/* openToast */}
                {openToast === false && (
                  <div className={`${form} scale-110 mx-auto flex flex-col items-center justify-center`}>
                        <h2 className="text-white text-2xl font-bold mb-4 text-center pt-12 pb-2 ">
                            CONTACT US
                        </h2>
                        <div className="w-32 h-1 bg-[#FF8C00] rounded-full mb-4 mx-auto transition-all hover:w-1/4"></div>

                        <p  className="text-[#FF8C00] hover:text-[#FFA500] transition-colors duration-300  font-bold text-sm">
                            Fill out this form and our team will contact you shortly
                        </p>
                        <form className="w-full max-w-md mt-3" onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className={label}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. John Mario"
                                        className={input}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className={label}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g. example@ex.com"
                                    className={input}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Contact Number */}
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className={label}>Contact Number</label>
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        placeholder="e.g. +00000"
                                        className={input}
                                    />
                                    {errors.contactNumber && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.contactNumber}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className={label}>Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here "
                                        className={input}
                                        rows={5}
                                    ></textarea>
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className={button}>
                                Send
                            </button>
                        </form>
                    </div>
                )}
                {openToast === true && (
                    <div className="flex-1 flex flex-col items-center p-6 sm:p-4 lg:p-8 sm:w-full lg:w-1/2 min-h-screen justify-center">
                        <div className="flex">
                            <MailOpen color="white" className="mr-3" size={50} />
                            <label className="text-white text-3xl font-black">
                            Your message has been sent successfully!
                            </label>
                        </div>
                        <a href="/" className="mt-6 px-6 py-2 bg-[#D9D9D9] text-[#1A1A22] font-black rounded-3xl border-gray-600 border transition-colors duration-300 hover:bg-[#fff]">
                                HOME
                            </a>
                    </div>
                   
                )}
            </div>

        </div>
    );
}

export default RegisterPage;