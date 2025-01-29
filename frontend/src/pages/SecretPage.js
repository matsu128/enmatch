import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "プロジェクト機能",
    description: "短期でプロジェクトを作って実際にリリースできるようなサービス",
    releaseMonth: "2025年4月",  // 追加
  },
  {
    title: "チーム開発体験機能",
    description:
      "経験者がメンターとして入り、実際にチーム開発の流れを体験しながらプロジェクトを完遂できるようなサービス",
    releaseMonth: "2025年6月",  // 追加
  },
];

const SecretPage = () => {
  const [activeFeatures, setActiveFeatures] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    setTimeout(() => setShowPage(true), 2000); // 2秒後に表示
  }, []);

  const toggleFeature = (index) => {
    setActiveFeatures((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleMouseClick = (e) => {
    const { clientX, clientY } = e;
    const newRipple = { id: Date.now(), left: clientX, top: clientY };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  const words = "Welcome to the Secret Page".split(" ");

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex justify-center items-center p-4 relative overflow-hidden"
      onClick={handleMouseClick}
    >
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none"
          style={{ left: ripple.left, top: ripple.top, width: 200, height: 200 }}
          initial={{ scale: 0, opacity: 0.7 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}
      {!showPage ? (
        <motion.div
          className="text-4xl md:text-6xl font-bold text-gray-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          Generating New Features...
        </motion.div>
      ) : (
        <motion.div
          className="w-[90%] max-w-4xl space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-5xl font-bold text-gray-200 mb-4 text-center tracking-widest">
            {words.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                whileHover={{
                  y: [-3, 3, -3],
                  rotate: [0, 10, -10, 0],
                  color: ["#ffffff", "#000000", "#ffffff"],
                }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="text-center text-gray-500 mb-6">
            エンジニアにとってより良い機能を
          </p>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="border border-gray-700 rounded-xl p-4 shadow-md bg-gray-800 hover:shadow-lg transition duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleFeature(index)}
              >
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-2xl font-semibold text-gray-300 hover:text-white transition duration-300"
                >
                  {feature.title}
                </motion.div>
                {activeFeatures.includes(index) && (
                  <motion.div
                    className="mt-4 p-4 bg-gray-700 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-gray-400">{feature.description}</p>
                    <p className="text-gray-300 text-sm text-right mt-4">
                      {feature.releaseMonth} リリース予定
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SecretPage;
