import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-purple-200 text-purple-950 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3 sm:grid-cols-1">
                {/* Logo and description */}
                <div className="space-y-2">
                    <div className="text-xl font-bold flex items-center gap-2">
                        <span className="text-2xl">📚</span>
                        StudyMate
                    </div>
                    <p className="text-sm">
                        Find your perfect study partner by subject, style, and schedule. Learn better together.
                    </p>
                </div>

                {/* Follow us / Social icons */}
                <div className="space-y-2 flex flex-col items-start sm:items-start md:items-center">
                    <div className="font-semibold">Follow us</div>
                    <div className="flex gap-4 text-2xl">
                        <a href="#" aria-label="Facebook" className="hover:text-purple-700 transition"><FaFacebook /></a>
                        <a href="#" aria-label="X (Twitter)" className="hover:text-purple-700 transition"><FaTwitter /></a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-purple-700 transition"><FaLinkedin /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-purple-700 transition"><FaInstagram /></a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-sm flex items-end sm:items-start md:justify-end">
                    © {new Date().getFullYear()} StudyMate. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
