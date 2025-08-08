import { motion } from "framer-motion";

const lines = [
  { text: "Build HEALTH." },
  { text: "Sculpt PHYSIQUE." },
  { text: "Live AESTHETIC." },
];

export default function AnimatedText() {
  return (
    <div className="space-y-4">
      {lines.map((line, index) => (
        <motion.p
          key={line.text}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: index * 0.4, 
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          - {line.text.split(' ')[0]}{" "}
          <span className="text-white text-4xl md:text-4xl lg:text-5xl font-bold">
            {line.text.split(' ')[1]}
          </span>
        </motion.p>
      ))}
    </div>
  );
}
