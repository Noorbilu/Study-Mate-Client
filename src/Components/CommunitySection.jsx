import { motion } from "framer-motion";
import { Users2, Coffee, Sparkles } from "lucide-react";

const activities = [
  {
    icon: Users2,
    title: "Peer Learning Circles",
    text: "Weekly topic-based groups for collaborative problem solving.",
  },
  {
    icon: Coffee,
    title: "Virtual Café Meets",
    text: "Casual video sessions for idea exchange and motivation.",
  },
  {
    icon: Sparkles,
    title: "Hackathons & Challenges",
    text: "Friendly academic competitions that keep everyone sharp and inspired.",
  },
];

const CommunitySection = () => (
  <section className="py-24 px-6 bg-white">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl font-bold text-center mb-14 text-fuchsia-900"
    >
      A Thriving Student Community
    </motion.h2>

    <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 text-center">
      {activities.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="p-10 bg-fuchsia-50 rounded-3xl border border-fuchsia-100 hover:shadow-md transition"
        >
          <a.icon className="w-10 h-10 text-fuchsia-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-3 text-fuchsia-800">{a.title}</h3>
          <p className="text-gray-700">{a.text}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CommunitySection;