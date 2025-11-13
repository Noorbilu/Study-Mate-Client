import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    img: "https://i.ibb.co.com/chXfKrPY/problem-solving-concept-with-books.jpg",
  },
  {
    id: 2,
    img: "https://i.ibb.co.com/yFt1RjwP/close-up-colorful-books-pile.jpg",
  },
  {
    id: 3,
    img: "https://i.ibb.co.com/WWPjys4j/study4.png",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="relative w-full bg-fuchsia-50 pb-5">
      {/* Hero Text Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-5 mb-6"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-fuchsia-100 drop-shadow-lg"
        >
          Level Up Your Reading Experience
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-3 text-lg text-fuchsia-800 font-bold"
        >
          Connect minds, share knowledge — your study partner awaits.
        </motion.p>
      </motion.div>

      {/* Carousel */}
      <div
        className="relative w-11/12 md:w-10/12 mx-auto overflow-hidden rounded-2xl shadow-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            <img
              src={slide.img}
              alt=""
              className="w-full h-[480px] object-cover rounded-2xl brightness-105 contrast-115 saturate-125"
            />
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent((current + 1) % slides.length)}
          className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white"
        >
          ❯
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;