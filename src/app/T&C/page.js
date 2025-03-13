"use client";

import Navbar from "../components/navbar";

function TandC() {


    return (

        <div className="flex flex-col bg-[#1a1a22] justify-center items-center min-h-screen bg-cover bg-center p-6" >
            <h1 className="text-4xl text-white font-bold mb-6">Terms & Conditions</h1>
            <div className="w-full max-w-2xl space-y-10">
                {/* Return Period */}
                <div className="bg-white h- p-6 rounded-2xl shadow-lg hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">Return Period</h2>
                    <p className=" text-xl text-black p-2">
                        1. Welcome to Game Vault!

                        By accessing or using Game Vault ("we," "our," or "us"), you agree to these Terms & Conditions. If you don’t agree, well... you can always rage quit, but we’d rather you stay! </p>

                    <p className=" text-xl text-black p-2">2. Who Can Use Game Vault?

                        You must be at least 13 years old (or have permission from a responsible adult).

                        You agree to use Game Vault only for legal and non-shady activities.

                        If we suspect any rule-breaking, we reserve the right to banhammer your account. ,</p>

                    <p className=" text-xl text-black p-2">3. Your Account

                        Keep your login credentials safe—don’t share them, unless you enjoy unexpected inventory losses.

                        We’re not responsible for any unauthorized access to your account. Use strong passwords!

                        If you suspect suspicious activity, contact support ASAP. </p>

                    <p className="text-xl text-black p-2">4. Buying & Selling Games

                        All prices are in USD (unless stated otherwise) and may change faster than a speedrunner completing a level.

                        Digital game codes are non-refundable once redeemed.

                        Physical games can be returned if they meet our Return Policy. </p>

                    <p className=" text-xl text-black p-2">5. User Conduct

                        You MUST NOT:

                        Use cheats, exploits, or hacks.

                        Engage in harassment, hate speech, or general toxic behavior.

                        Try to break our website (seriously, our developers are already stressed enough).

                        Violate any applicable laws or regulations. </p>

                    <p className=" text-xl text-black p-2">6. Content Ownership

                        All content on Game Vault (logos, text, images, game descriptions) belongs to us or our partners.

                        Don’t steal, copy, or use our content without permission, or we’ll have to level up our legal team. </p>

                    <p className="text-xl text-black p-2">7. Limitation of Liability

                        We try our best to keep everything running smoothly, but we can’t guarantee 100% uptime (even the best servers need a break).

                        We are not responsible for any in-game losses, corrupted saves, or unfortunate encounters with game-breaking bugs. </p>

                    <p className="text-xl text-black p-2">8. Termination

                        If you break these rules, we may suspend or terminate your account without warning.

                        If you think we made a mistake, you can appeal by contacting our support team. </p>

                    <p className="text-xl text-black p-2"> 9. Changes to These Terms

                        We may update these Terms from time to time. If we make big changes, we’ll let you know (but checking this page regularly is a good habit!). </p>

                    <p className="text-xl text-black p-2"> 10. Contact Us

                        Questions? Issues? Found a typo? Reach out at 📧 support@gamevault.com.</p>



                </div>




            </div>
        </div>

    );
}

export default TandC;