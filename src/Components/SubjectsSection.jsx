import { motion } from "framer-motion";

const subjects = [
  { title: "Computer Science", desc: "Coding labs, algorithms, operating systems, and project collaboration." },
  { title: "Electrical & Electronic Engineering", desc: "Circuit theory, electromagnetic fields, power systems, and design projects." },
  { title: "Architecture", desc: "Design studios, portfolio critiques, and sustainable development concepts." },
  { title: "Business Administration", desc: "Group case studies, presentations, and strategic management tasks." },
  { title: "English Literature", desc: "Discussion on texts, literary criticism, and creative writing sessions." },
  { title: "Pharmacy", desc: "Lab coordination, pharmacology exam prep, and practical experiments." },
];

const SubjectsSection = () => (
  <section className="py-24 px-6 bg-gradient-to-br from-pink-50 to-fuchsia-50">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-4xl font-bold text-center text-fuchsia-900 mb-12"
    >
      Study Together Across Departments
    </motion.h2>

    <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subj, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-3xl border border-fuchsia-100 shadow-sm p-8 hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-fuchsia-800 mb-3">{subj.title}</h3>
          <p className="text-gray-700 leading-relaxed">{subj.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SubjectsSection;