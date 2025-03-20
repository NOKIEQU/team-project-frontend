"use client";

import React, { use, useState } from "react";
import { useCart } from "../../context/cart-context";
import { useUser } from "../../context/user-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Checkout = () => {
  const input =
    "w-full px-3 py-2 bg-transparent border-b-2 border-[#1A1A22] text-[#1A1A22]  text-sm outline-none mb-3";
  const label = "text-[#1A1A22] font-bold text-sm mb-1 block";

  const [selectedPayment, setSelectedPayment] = useState("MasterCard");
  const { cart, getCartTotal, clearCart, removeFromCart } = useCart()
  const { user } = useUser();
  const router = useRouter();

  const [openToast, setOpenToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    postcode: "",
    address: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    visaCardNumber: "",
    visaExpiryDate: "",
    visaCvv: ""
  });
  const [errors, setErrors] = useState({});

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
    if (!formData.postcode) {
      formErrors.postcode = "Postcode is required.";
    } else if (!/^[A-Za-z0-9]{5,7}$/.test(formData.postcode)) {
      formErrors.postcode = "Invalid postcode format.";
    }
    if (!formData.phone) {
      formErrors.phone = "Phone number is required.";
    } else if (!/^[+]?[0-9]+$/.test(formData.phone)) {
      formErrors.phone = "Invalid phone number format.";
    }
    if (!formData.address) {
      formErrors.address = "Address is required.";
    }
    if (!selectedPayment) {
      formErrors.payment = "Please select a payment method.";
    } else if (selectedPayment == "MasterCard" && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      formErrors.paymentDetails = "Please fill in all payment details. Master";
    } else {
      if (selectedPayment == "Visa" && (!formData.visaCardNumber || !formData.visaExpiryDate || !formData.visaCvv)) {
        formErrors.paymentDetails = "Please fill in all payment details. Visa";
      }
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {


      clearCart();
    } else {
    }
  };

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }
    , []);

  return (
    <div className="min-h-screen h-full">
      {openToast === false && (
        <div className="absolute w-full h-full min-h-screen " style={{ "zIndex": "0", "top": "250px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <polygon
              points="100,10 100,15 0,93 0,88"
              fill="rgba(255, 255, 255, 0.4)"
            />
            <polygon
              points="100,18 100,23 0,100 0,95"
              fill="rgba(255, 255, 255, 0.8)"
            />
          </svg>
        </div>
      )}
      {openToast === false && (

        <div className=" min-h-screen pt-10 pb-10 bg-[#1A1A22] text-white flex flex-col justify-center items-center"
          style={{ "z-index": "1" }}
        >
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div
              className="w-[80%] flex flex-col md:flex-col lg:flex-row xl:flex-row 
  justify-center md:justify-between lg:justify-between xl:justify-between
        "
            >
              <div className="flex flex-col sm:items-center  sm:w-full md:w-[80%] lg:w-[45%] xl:w-[45%]">
                {/* Order Summary */}
                <div className="bg-[#F0ECEC] shadow-lg  rounded-3xl   mb-4 w-full"
                  style={{ "z-index": "1" }}
                >
                  <h2 className="p-4 text-2xl font-black text-black text-center">
                    ORDER SUMMARY
                  </h2>
                  <div className="w-full h-[10px] bg-[#1A1A22]"></div>


                  {cart.map((item, index) => (
                    <div key={index} className="p-4 rounded-tl-lg border-gray-300 flex items-center justify-between">
                      <div className="flex items-center">
                        <label className="pr-1 font-black text-black text-center">X{item.quantity}</label>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg mr-4"
                        />
                        <div>
                          <p className="text-black font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">Price: £{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => {
                          removeFromCart(item.id);
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                  ))}



                  <div className="w-full h-[10px] bg-[#1A1A22]"></div>

                  <div className="p-4 rounded-bl-lg">
                    <p className="p-4 text-lg font-black text-black">
                      TOTAL: £{getCartTotal().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Methods & Payment Methods */}
              {/* style={{"align-items":"flex-end"}} */}
              <div style={{ "z-index": "1" }} className="flex flex-col sm:items-center md:items-center  sm:w-full md:w-[80%] lg:w-[45%] xl:w-[45%]"
              >
                {/* Billing Address */}
                <div className="bg-[#F0ECEC] shadow-lg  rounded-3xl w-full pb-4 ">
                  <h2 className="p-4 text-2xl font-black text-black text-center">
                    BILLING ADDRESS
                  </h2>
                  <div className="w-full h-[10px] bg-[#1A1A22]"></div>
                  <div className="p-4">
                    <div className="flex-1">
                      <label className={label}>Name</label>
                      <input
                        value={formData.name}
                        type="text"
                        name="name"
                        placeholder="e.g. John Mario"
                        className={input}
                        onChange={handleChange}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="flex-1">
                      <label className={label}>E-Mail</label>
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="e.g. example@ex.com"
                        className={input}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="flex-1">
                      <label className={label}>Country</label>
                      <select className={input}>
                        <option value="">Select Country</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BR">Brazil</option>
                        <option value="BN">Brunei</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CV">Cape Verde</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CR">Costa Rica</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GR">Greece</option>
                        <option value="GT">Guatemala</option>
                        <option value="GN">Guinea</option>
                        <option value="HT">Haiti</option>
                        <option value="HN">Honduras</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Laos</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MX">Mexico</option>
                        <option value="MD">Moldova</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="KP">North Korea</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PS">Palestine</option>
                        <option value="PA">Panama</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="QA">Qatar</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russia</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SG">Singapore</option>
                        <option value="ZA">South Africa</option>
                        <option value="KR">South Korea</option>
                        <option value="ES">Spain</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syria</option>
                        <option value="TH">Thailand</option>
                        <option value="TR">Turkey</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="VN">Vietnam</option>
                        <option value="YE">Yemen</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className={label}>Post Code</label>
                      <input
                        value={formData.postcode}
                        onChange={handleChange}
                        type="text"
                        name="postcode"
                        placeholder="e.g. B0xxxx"
                        className={input}
                      />
                      {errors.postcode && <p className="text-red-500 text-sm">{errors.postcode}</p>}
                    </div>
                    <div className="flex-1">
                      <label className={label}>Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="e.g. 27 xxxst. xxxxx"
                        className={input}
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    <div className="flex-1">
                      <label className={label}>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="e.g. +00000"
                        className={input}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="mb-10 w-full h-[10px] bg-[#1A1A22]"></div>
                </div>

                {/* Payment Methods */}
                <div className="bg-[#F0ECEC] shadow-lg  rounded-3xl  mt-4 w-full">
                  <h2 className="p-4 text-2xl font-black text-black text-center">
                    PAYMENT METHODS
                  </h2>
                  <div className="w-full h-[10px] bg-[#1A1A22]"></div>
                  <div className="pt-4 pb-4  rounded-tl-lg border-gray-300 flex-col flex items-center justify-between">
                    <div className="flex items-center justify-between w-[90%]">
                      <img
                        src="/visa_1.png"
                        alt="Game Vault Action"
                        className="w-1/4 rounded-lg"
                      />
                      <span className="font-black text-sm text-[#1A1A22]">
                        VisaCard
                      </span>
                      <button
                        className={`font-black flex w-[100px] items-center justify-between p-3 rounded ${selectedPayment === "Visa"
                          ? "bg-white text-[#1A1A22]"
                          : "bg-[#1A1A22] text-white"
                          }`}
                        onClick={() => setSelectedPayment("Visa")}
                      >
                        <span className="font-black  text-sm ml-1 w-full">
                          {selectedPayment === "Visa" ? "Selected" : "pay"}
                        </span>
                      </button>
                    </div>

                    {selectedPayment === "Visa" && (
                      <div className="flex flex-col max-w-[90%] w-[90%]">
                        <div className="flex justify-between">
                          <div className="w-[60%]">
                            {/* <label className={label}>E-Mail</label> */}
                            <input
                              type="text"
                              name="visaCardNumber"
                              placeholder="insert the 16 digit numbers"
                              className={input}
                              value={formData.visaCardNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="w-[35%]">
                            {/* <label className={label}>E-Mail</label> */}
                            <input
                              type="text"
                              name="visaExpiryDate"
                              placeholder="Expiry Date"
                              className={input}
                              value={formData.visaExpiryDate}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="w-[35%]">
                            {/* <label className={label}>E-Mail</label> */}
                            <input
                              type="text"
                              name="visaCvv"
                              placeholder="cvv"
                              className={input}
                              value={formData.visaCvv}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {errors.paymentDetails && <p className="text-red-500 text-sm">{errors.paymentDetails}</p>}
                      </div>
                    )}
                  </div>
                  <div className="w-full h-[10px] bg-[#1A1A22]"></div>
                  <div className="pt-4 pb-4 rounded-tl-lg border-gray-300 flex-col flex items-center justify-between">
                    <div className="flex items-center justify-between w-[90%]">
                      <img
                        src="/aMastercard.png"
                        alt="Game Vault Action"
                        className="w-1/4 rounded-lg"
                      />
                      <span className="font-black text-sm text-[#1A1A22]">
                        MasterCard
                      </span>
                      <button
                        className={` font-black flex  w-[100px] items-center justify-between p-3 rounded ${selectedPayment === "MasterCard"
                          ? "bg-white text-[#1A1A22]"
                          : "bg-[#1A1A22] text-white"
                          }`}
                        onClick={() => setSelectedPayment("MasterCard")}
                      >
                        <span className="font-black text-sm ml-1 w-full">
                          {selectedPayment === "MasterCard" ? "Selected" : "pay"}
                        </span>
                      </button>
                    </div>
                    {selectedPayment === "MasterCard" && (
                      <div className="flex flex-col max-w-[90%] w-[90%]">
                        <div className="flex justify-between">
                          <div className="w-[60%]">
                            {/* <label className={label}>E-Mail</label> */}
                            <input
                              type="text"
                              name="cardNumber"
                              placeholder="insert the 16 digit numbers"
                              className={input}
                              value={formData.cardNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="w-[35%]">
                            {/* <label className={label}>E-Mail</label> */}
                            <input
                              type="text"
                              name="expiryDate"
                              placeholder="Expiry Date"
                              className={input}
                              value={formData.expiryDate}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="w-[35%]">
                            {/* <label className={label}>E-Mail</label> */}
                            <input
                              type="text"
                              name="cvv"
                              placeholder="cvv"
                              className={input}
                              value={formData.cvv}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {errors.paymentDetails && <p className="text-red-500 text-sm">{errors.paymentDetails}</p>}
                      </div>
                    )}



                  </div>

                  <div className="w-full h-[10px] bg-[#1A1A22]"></div>
                  <div className="pb-4 pt-4 rounded-tl-lg border-gray-300 flex items-center justify-around">
                    <div className="flex items-center justify-between w-[90%]">
                      <img
                        src="/Paypal-Logo2.png"
                        alt="Game Vault Action"
                        className="w-1/4 rounded-lg"
                      />
                      <span className="font-black text-sm text-[#1A1A22]">PayPal</span>
                      <button
                        className={` font-black flex  w-[100px] items-center justify-between p-3 rounded ${selectedPayment === "PayPal"
                          ? "bg-white text-[#1A1A22]"
                          : "bg-[#1A1A22] text-white"
                          }`}
                        onClick={() => setSelectedPayment("PayPal")}
                      >
                        <span className="font-black text-sm ml-1 w-full">
                          {selectedPayment === "PayPal" ? "Selected" : "pay"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* Submit Button */}
            <button onClick={handleSubmit} className="mt-6 px-10 py-4 bg-[#F0ECEC] text-[#1A1A22] font-black rounded-3xl border-gray-600 border transition-colors duration-300 hover:bg-[#fff]">
              SUBMIT
            </button>
          </form>
        </div>
      )}



      {openToast === true && (
        <div className=" min-h-screen flex flex-col font-sans bg-[#1A1A22] h-full">
          <div className="flex flex-1 flex-col lg:flex-row">
            <div className="flex-[1.8] relative overflow-hidden flex justify-start items-center text-white">
              <img
                src="/back.webp"
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
                    fill="rgba(255, 255, 255, 0.4)"
                  />
                  <polygon
                    points="90,0 100,0 80,100 70,100"
                    fill="rgba(255, 255, 255, 0.8)"
                  />
                </svg>
              </div>

            </div>
            <div className="flex-1 flex flex-col items-center p-6 sm:p-4 lg:p-8 sm:w-full lg:w-1/2 min-h-screen justify-center">
              <div className="flex">

                <label style={{ "font-family": "Oswald" }} className="text-white text-3xl font-black">
                  Your payment has been made successfully!
                </label>
              </div>
              <a href="/" className="mt-6 px-6 py-2 bg-[#D9D9D9] text-[#1A1A22] font-black rounded-3xl border-gray-600 border transition-colors duration-300 hover:bg-[#fff]">
                HOME
              </a>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};

export default Checkout;