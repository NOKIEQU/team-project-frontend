"use client";

import Navbar from "../components/navbar";

function ReturnsPolicy() {


    return (

        <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-[#1a1a22] bg-center p-6" >
            <h1 className="text-4xl text-white font-bold mb-6">FAQ</h1>
            <div className="w-full max-w-2xl space-y-10">
                {/* Return Period */}
                <div className="bg-white h-56 p-6 rounded-2xl shadow-lg hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2"> What is Game Vault?</h2>
                    <p className="text-black">
                        Game Vault is your ultimate destination for buying, selling, and discovering video games. Whether you're looking for the latest releases or nostalgic classics, we’ve got you covered.
                    </p>
                </div>

                {/* Return Conditions */}
                <div className="bg-white h-58 p-6 rounded-2xl shadow-lg hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">How do I create an account?</h2>

                    Simply click the Sign Up button, enter your email, create a password, and you’re good to go! You can also sign up using Google or other available options.
                    <p className="text-black">
                        We’re not saying you need to keep it in a display case… but that would help.
                    </p>
                </div>

                {/* Refund Process */}
                <div className="bg-white h-56 p-6 rounded-2xl shadow-lg hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">What payment methods do you accept?</h2>
                    <p className="text-black">
                        We accept:
                    </p>
                    <ul className="text-black list-disc pl-6">
                        <li>✔️ Credit & Debit Cards (Visa, MasterCard, Amex)</li>
                        <li>✔️  PayPal</li>
                        <li>✔️  MasterCard</li>
                        <li>✔️  PayPal</li>
                    </ul>

                </div>

                {/* How to Initiate a Return */}
                <div className="bg-white h-56 p-6 rounded-2xl shadow-lg hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">How do I track my order?</h2>
                    <p className="text-black">Once your order ships, you’ll receive an email with a tracking number. You can also check your order status in the My Orders section of your account</p>


                </div>

                <div className="bg-white h-56 p-6 rounded-2xl shadow-lg hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">My order is missing or damaged—help!</h2>
                    <p className="text-black">No worries! If your order is damaged or didn’t arrive, reach out to us at 📧 gamevault@gmail.com, and we’ll sort it out ASAP.</p>


                </div>
                <div className="bg-white h-56 p-6 rounded-2xl shadow-lg hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">How do I contact support?</h2>
                    <p className="text-black">
                        Our support team is available via:


                    </p>
                    <ul className="text-black list-disc pl-6">
                        <li>: 📧 Email: gamevault@gmail.com</li>
                        <li>📞 Phone Support +44 2345 678900 </li>
                        
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default ReturnsPolicy;