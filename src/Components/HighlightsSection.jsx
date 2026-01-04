import { motion } from "framer-motion";

const stats = [
  { label: "Active Students", number: "8,000+" },
  { label: "Sessions Organized", number: "36,500+" },
  { label: "Universities Connected", number: "40+" },
  { label: "Average Study Hours / Week", number: "5.2" },
];

const HighlightsSection = () => (
  <section className="py-24 px-6 bg-fuchsia-600 text-white text-center">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-5xl font-bold mb-14"
    >
      StudyMate in Numbers
    </motion.h2>

    <div className="max-w-5xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex flex-col"
        >
          <span className="text-4xl font-extrabold mb-2">{s.number}</span>
          <span className="text-sm text-fuchsia-100">{s.label}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HighlightsSection;