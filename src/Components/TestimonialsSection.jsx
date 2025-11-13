import React from 'react';
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Afsana, CSE 2nd Year",
            quote:
                "I met my perfect study partner through StudyMate! We prepare for lab exams together — it’s made studying way more fun and productive.",
        },
        {
            name: "Boo, EEE 3rd Year",
            quote:
                "I love how easy it is to find classmates by subject. The platform helped me join a group for my circuit theory course within minutes!",
        },
        {
            name: "Noor, Architecture 1st Year",
            quote:
                "StudyMate made it so easy to connect with new people from different departments. It feels like a small, supportive PUB student community.",
        },
    ];

    return (
        <section className=" overflow-hidden py-24 px-6 bg-fuchsia-50 ">

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_60%)]"></div>

            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-5xl md:text-5xl font-bold text-center mb-14 text-fuchsia-900 tracking-tight"
            >
                What Students Say
            </motion.h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 15px 35px rgba(56,189,248,0.25)",
                        }}
                        className="relative bg-white/70 backdrop-blur-md border border-fuchsia-100 rounded-3xl shadow-sm p-8 text-center hover:bg-white/90 transition-all"
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-fuchsia-100 p-3 rounded-full shadow-md">
                            <MessageSquare className="w-6 h-6 text-fuchsia-600" />
                        </div>

                        <p className="italic text-gray-700 mt-6 mb-3 text-lg leading-relaxed">
                            “{t.quote}”
                        </p>
                        <p className="text-sm font-medium text-fuchsia-800">— {t.name}</p>
                    </motion.div>
                ))}
            </div>
            <div className="mt-20 h-px bg-gradient-to-r from-transparent via-fuchsia-200 to-transparent"></div>
        </section>
    );
};

export default TestimonialsSection;
