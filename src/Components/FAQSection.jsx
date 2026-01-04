import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is StudyMate free to use?",
    a: "Yes. Core features like matching, messaging, and group scheduling are completely free for students.",
  },
  {
    q: "How are matches determined?",
    a: "StudyMate uses academic year, department, subject interests, and availability to connect compatible study partners.",
  },
  {
    q: "Is my information secure?",
    a: "Absolutely. All user data is encrypted, and your personal contact details are never shared publicly.",
  },
  {
    q: "Can I choose partners from my own department?",
    a: "Yes. You can filter study partners by department, academic year, and subject preferences.",
  },
  {
    q: "Can I study with students from other departments?",
    a: "Of course! StudyMate encourages cross-department collaboration to help students learn from diverse perspectives.",
  },
  {
    q: "What if a study partner is inactive or unresponsive?",
    a: "You can disconnect anytime and find new partners that better match your study style and availability.",
  },
  {
    q: "Do I need to share my phone number or social media?",
    a: "No. All communication happens securely inside the StudyMate platform.",
  },
];


const FAQSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-24 px-6 bg-white">
      <h2 className="text-4xl font-bold text-center text-fuchsia-900 mb-12">Frequently Asked Questions</h2>

      <div className="max-w-3xl mx-auto space-y-5">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="border border-fuchsia-100 rounded-2xl p-6 bg-fuchsia-50 hover:bg-fuchsia-100 transition"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="font-medium text-lg text-fuchsia-800">{item.q}</span>
              <ChevronDown
                className={`w-6 h-6 text-fuchsia-700 transition-transform ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && <p className="mt-4 text-gray-700">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;