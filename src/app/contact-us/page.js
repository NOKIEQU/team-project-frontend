"use client";
import { useState } from "react";
import { MailOpen } from "lucide-react";
import * as Toast from "@radix-ui/react-toast";

function RegisterPage() {
    const input = "w-full px-4 py-3 bg-transparent border-b-2 border-[#F0ECEC] text-white text-sm outline-none focus:border-[#FF8C00] transition-all duration-300";
    const label = "text-white font-semibold text-sm mb-1 block";
    const button = "w-full px-4 py-3 bg-[#FF8C00] text-white rounded-full font-bold hover:bg-[#FFA500] shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.05]";
    const form = "flex-1 flex flex-col items-center p-8 sm:w-full lg:w-1/2 max-w-lg bg-[#23232D] shadow-lg rounded-lg";

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
        if (!formData.name || formData.name.length < 2) {
            formErrors.name = "Name must be at least 2 characters.";
        }
        if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            formErrors.email = "Invalid email address.";
        }
        if (!formData.contactNumber || !/^[+]?[0-9]+$/.test(formData.contactNumber)) {
            formErrors.contactNumber = "Invalid phone number.";
        }
        if (!formData.message || formData.message.length < 10) {
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
        }
    };

    return (
        <div className="relative flex flex-col bg-[#1A1A22] min-h-screen justify-center items-center p-6">
           {/* Background Lines */}
<div className="absolute top-0 right-0 w-full h-full z-0">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
    >
        {/* Original polygons adjusted */}
        <polygon points="78,0 82,0 60,100 55,100" fill="rgba(255, 140, 0, 0.1)" />
        <polygon points="90,0 94,0 75,100 70,100" fill="rgba(255, 140, 0, 0.1)" />
        
        {/* Additional polygons for more dense dashed line effect */}
        <polygon points="70,0 72,0 50,100 47,100" fill="rgba(255, 140, 0, 0.08)" />
        <polygon points="66,0 68,0 45,100 42,100" fill="rgba(255, 140, 0, 0.08)" />

     
        <polygon points="84,0 86,0 65,100 62,100" fill="rgba(255, 140, 0, 0.08)" />
        <polygon points="96,0 98,0 80,100 77,100" fill="rgba(255, 140, 0, 0.08)" />
        
        
        <rect x="0" y="0" width="100" height="100" fill="url(#grid)" /> 
    </svg>
</div>

            {/* Contact Form */}
            {!openToast ? (
                <div className={`${form} relative z-10`}>
                    <h2 className="text-white text-2xl font-bold mb-2 mt-6 text-center">CONTACT US</h2>
                    <div className="w-32 h-1 bg-[#FF8C00] rounded-full mb-4 mx-auto"></div>
                    <p className="text-[#FF8C00] font-semibold text-sm mb-6 text-center">
                        Fill out this form and our team will contact you shortly
                    </p>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className={label}>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Mario" className={input} />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className={label}>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. example@ex.com" className={input} />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className={label}>Contact Number</label>
                            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="e.g. +00000" className={input} />
                            {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
                        </div>

                        <div className="mb-4">
                            <label className={label}>Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here" className={input} rows={4}></textarea>
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </div>

                        <button type="submit" className={button}>Send</button>
                    </form>
                </div>
            ) : (
                <div className="flex flex-col items-center bg-[#23232D] p-8 rounded-lg shadow-lg z-10">
                    <MailOpen color="white" className="mb-3" size={50} />
                    <h3 className="text-white text-xl font-bold text-center">Your message has been sent successfully!</h3>
                    <a href="/" className="mt-6 px-6 py-2 bg-[#D9D9D9] text-[#1A1A22] font-bold rounded-full transition duration-300 hover:bg-white">HOME</a>
                </div>
            )}
        </div>
    );
}

export default RegisterPage;
