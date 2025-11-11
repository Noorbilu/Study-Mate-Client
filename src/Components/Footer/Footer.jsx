import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-purple-200 mt-12">
            <div className="ml-12 mx-auto px-4 py-6 grid md:grid-cols-3 sm:grid-cols-3 gap-6">
                <div>
                    <div className="font-bold text-lg">📚 StudyMate</div>
                    <p className="mt-2 text-sm">
                        Find your perfect study partner by subject, style, and schedule. Learn better together.
                    </p>
                </div>

                    <div className="text-sm pt-20 pl-15">
                        © {new Date().getFullYear()} StudyMate. All rights reserved.
                    </div>
                    <div className="">
                        <div className="font-semibold mb-2">Follow us</div>
                        <div className="flex gap-4 text-2xl">
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="X (Twitter)"><FaXTwitter /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        </div>
                    </div>
                    
                </div>
        </footer>
    );
};

export default Footer;