import React from 'react';
import { motion } from "framer-motion";
import { Users, BookOpen, Brain } from "lucide-react";

import step1 from "../assets/pip1.jpg";
import step2 from "../assets/pip2.jpg";
import step3 from "../assets/pip3.png";

const HowItWorks = () => {

    const steps = [
    {
      image: step1,
      icon: <BookOpen className="w-10 h-10 text-fuchsia-700" />,
      title: "Create Your Study Profile",
      text: "Set up your learning goals, preferred subjects, and study schedule so others can find you easily.",
    },
    {
      image: step2,
      icon: <Users className="w-10 h-10 text-fuchsia-700" />,
      title: "Find Your Perfect Partner",
      text: "Browse or get matched with students who share your academic interests and learning habits.",
    },
    {
      image: step3,
      icon: <Brain className="w-10 h-10 text-fuchsia-700" />,
      title: "Collaborate & Grow",
      text: "Chat, plan study sessions, share resources, and track your learning progress together.",
    },
  ];


    return (
         <section className="relative py-24 px-6 bg-gradient-to-b from-white via-fuchsia-50 to-white overflow-hidden">
      {/* soft decorative glow */}
      <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(192,132,252,0.25),transparent_50%)]"></div>

      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 text-fuchsia-900 tracking-tight">
        How It Works
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {steps.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.7, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 35px rgba(192,132,252,0.25)",
            }}
            className="rounded-3xl overflow-hidden shadow-md bg-white border border-fuchsia-100 hover:border-fuchsia-200 transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-center justify-center">
                <div className="bg-white/90 p-3 rounded-full shadow-md">
                  {item.icon}
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="p-6 text-center">
              <h3 className="font-semibold text-lg text-fuchsia-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    );
};

export default HowItWorks;