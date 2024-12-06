"use client";
import {useState} from "react"
import * as Toast from "@radix-ui/react-toast"
function RegisterPage() {
    const input =
        "w-full px-3 py-2 bg-transparent border-b-2 border-[#e38302] text-white text-sm outline-none";
    const label = 
        "text-white font-bold text-sm mb-1 block";
    const button =
        "w-full py-3 bg-[#e38302] text-[#1c1c1c] rounded-full font-bold text-lg transition-colors duration-300 hover:bg-[#fa9a00ef]";
    const form = 
        "flex-2 flex flex-col items-center p-8 ml-5 w-1/2";


    const [formData,setFormData]=useState({
        name:"",
        email:"",
        contactNumber:"",
        message:"",
    });
    const [errors,setErrors]=useState({});
    const [openToast,setOpenToast]=useState(false);
    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData({ ...formData,[name]:value});
    }
    const validateForm = () => {
        let formErrors = {};
        if(!formData.name){
            formErrors.name = "Name is required.";
        }else if (formData.name.length<2){
            formErrors.name="Name must be at least 2 characters.";
        }
        if(!formData.email){
            formErrors.email="Email is required.";
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)){
            formErrors.email="Invalid email address.";
        }
        if(!formData.contactNumber){
            formErrors.contactNumber="Contact number is required.";
        }else if (!/^[+]?[0-9]+$/.test(formData.contactNumber)){
            formErrors.contactNumber = "Invalid phone number.";
        }

        if(!formData.message){
            formErrors.message = "Message is required.";
        }else if (formData.message.length < 10){
            formErrors.message="Message must be at least 10 characters.";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()){
            setOpenToast(true)
            setFormData({name:"",email:"",contactNumber:"",message:""});
            setErrors({});
        }else{
            setOpenToast(false);
        }
    };
    return (
        <div className="flex flex-col font-sans bg-[#0d1b2a] h-full">
            <div className="flex flex-1">
                {/* Left Side of Page */}
                <div className="flex-[1.8] relative overflow-hidden flex justify-start items-center text-white">
                    <img
                        src="/bg.jpeg"
                        alt="Left Side"
                        className="absolute top-0 left-0 h-full w-full z-10 object-cover"
                        style={{
                            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
                        }}
                    />
                    <div className="absolute top-0 right-0 w-full h-full z-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="w-full h-full"
                        >
                            <polygon
                                points="77.5,0 85,0 65,100 55,100"
                                fill="rgba(255, 165, 0, 0.4)"
                            />
                            <polygon
                                points="90,0 100,0 80,100 70,100"
                                fill="rgba(255, 165, 0, 0.8)"
                            />
                        </svg>
                    </div>
                    <div className="relative z-30 p-8 max-w-lg">
                        <h1 className="text-4xl font-bold mb-10 text-white">
                            GET IN <span className="text-[#e38302]">TOUCH</span> WITH US
                        </h1>
                        <p className="text-2xl leading-7 font-bold">
                            We would love to hear form you. Feel free to reach out with any questions, comments, or feedback.
                        </p>
                    </div>
                </div>

                {/* Right Side of Page*/}
                <div className={form}>
                    <h2 className="text-white text-2xl font-bold mb-4 text-center">
                        Contact Us
                    </h2> 
                    <div className="w-24 h-1 bg-[#e38302] mx-auto mb-6"></div>
                    <form className="w-full max-w-md" onSubmit={handleSubmit}>
                        {/* Names */}
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className={label}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className={input}
                                    
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                                placeholder="Enter your email"
                                className={input}
                                
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

            
                        {/* Names */}
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className={label}>Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    placeholder="Contact Number"
                                    className={input}
                                    
                                />
                                {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
                            </div>
                        </div>


                        {/* Names */}
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className={label}>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Message"
                                    className={input}
                                
                                    rows={10}
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button type="submit" className={button}>
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <Toast.Provider swipeDirection="right">
                <Toast.Root open={openToast} onOpenChange={setOpenToast} className="bg-[#e38302] p-10 rounded-md text-[#0d1b2a] font-bold fixed top-1/3 left-1/3">
                    <Toast.Title>Your message has been successfully sent!</Toast.Title>
                </Toast.Root>
                <Toast.Viewport className="fixed bottom-0 right-0 p-6 z-50"/>
            </Toast.Provider>
        </div>
    );
}

export default RegisterPage;
