import { motion } from "framer-motion";
import { Search, MessageCircle, CalendarCheck, Award } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Partner Matching",
    desc: "Find students studying the same courses and topics with intelligent matching filters.",
  },
  {
    icon: MessageCircle,
    title: "Safe Chat Built-In",
    desc: "Talk, share notes, and collaborate instantly with StudyMate's protected chat rooms.",
  },
  {
    icon: CalendarCheck,
    title: "Shared Planner",
    desc: "Schedule sessions that automatically sync with your class timings.",
  },
  {
    icon: Award,
    title: "Progress Tracking",
    desc: "Stay motivated with streaks, milestones, and friendly leaderboard badges.",
  },
];

const FeaturesSection = () => (
  <section className="py-24 px-6 bg-fuchsia-50">
    <motion.h2
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center text-4xl font-bold text-fuchsia-900 mb-16"
    >
      Key Features
    </motion.h2>

    <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className="p-8 bg-white rounded-3xl border border-fuchsia-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
        >
          <f.icon className="w-12 h-12 text-fuchsia-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-fuchsia-800 mb-3">{f.title}</h3>
          <p className="text-gray-700 leading-relaxed">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;