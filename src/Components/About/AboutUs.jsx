import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Heart, Target } from "lucide-react";

const AboutUs = () => (
  <section className="min-h-screen bg-fuchsia-50 py-20 px-6">
    <div className="max-w-5xl mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-fuchsia-900 mb-6"
      >
        About StudyMate
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-700 leading-relaxed mb-14 max-w-3xl mx-auto"
      >
        StudyMate connects students who share academic goals and curiosity.
        We believe learning is more effective when done together — peer
        support and collaboration turn complex subjects into shared success.
      </motion.p>

      
      <div className="grid md:grid-cols-2 gap-10 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 bg-white rounded-3xl shadow border border-fuchsia-100"
        >
          <Target className="w-8 h-8 text-fuchsia-600 mb-3" />
          <h3 className="text-xl font-semibold text-fuchsia-800 mb-2">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To make academic collaboration easy and enjoyable by connecting
            learners across disciplines, campuses, and study levels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 bg-white rounded-3xl shadow border border-fuchsia-100"
        >
          <Heart className="w-8 h-8 text-fuchsia-600 mb-3" />
          <h3 className="text-xl font-semibold text-fuchsia-800 mb-2">Our Values</h3>
          <p className="text-gray-700 leading-relaxed">
            We value inclusivity, personal growth, and empathy. Every student
            deserves a positive learning environment and a supportive peer network.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 bg-white rounded-3xl shadow border border-fuchsia-100 md:col-span-2"
        >
          <Users className="w-8 h-8 text-fuchsia-600 mb-3" />
          <h3 className="text-xl font-semibold text-fuchsia-800 mb-2">Who We Are</h3>
          <p className="text-gray-700 leading-relaxed">
            A small, passionate team of educators, designers, and developers
            who understand the challenges of studying alone. StudyMate began as
            a student project and grew into a platform dedicated to connecting
            enthusiastic learners worldwide.
          </p>
        </motion.div>
      </div>

 
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16"
      >
        <a
          href="/allMates"
          className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-fuchsia-700 to-pink-500 text-white font-medium hover:from-pink-600 hover:to-fuchsia-800 transition"
        >
          Start Finding a Study Partner
        </a>
      </motion.div>
    </div>
  </section>
);

export default AboutUs;