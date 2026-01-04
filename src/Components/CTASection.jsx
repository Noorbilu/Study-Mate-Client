import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Link } from "react-router";

const CTASection = () => (
    <section
        className="py-28 px-6 bg-gradient-to-r from-fuchsia-800 to-fuchsia-500 text-white text-center relative overflow-hidden"
    >
        <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold mb-6"
        >
            Ready to Find Your Study Partner?
        </motion.h2>
        <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg max-w-2xl mx-auto mb-10"
        >
            Join thousands of students already studying smarter with StudyMate. It's free, friendly, and fast to start.
        </motion.p>
        <Link
            to="/allMates"
            className="inline-flex items-center px-8  bg-white text-fuchsia-700 font-semibold rounded-full hover:bg-fuchsia-100 transition"
        >
            <Rocket className="w-5 h-5 mr-2" /> Join Now
        </Link>
    </section>
);

export default CTASection;