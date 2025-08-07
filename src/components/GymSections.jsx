import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ImageCarousel from "./ImageCarousel";

function AnimatedCard({ type, title, description }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });


  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }else {
    controls.start("hidden");
  }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' }
        },
        hidden: {
          opacity: 0,
          y: 50,
          transition: { duration: 0.6, ease: 'easeIn' }
        }

      }}
      className="flex flex-col h-full bg-neutral-900 rounded-xl"
    >
      <ImageCarousel type={type} />
      <div className="py-2 md:py-4 lg:py-5 px-4">
        <h1 className="heading-text text-3xl md:text-5xl">{title}</h1>
        <p className="paragraph-text text-xs md:text-base mt-0.5 md:mt-2">{description}</p>
      </div>
    </motion.div>
  );
}

export default function GymSections() {
  return (
    <>
    <div className="py-2 md:py-4 lg:py-5 px-4">
      <AnimatedCard
        type="gym"
        title="STRENGTH TRAINING"
        description="Step into the Strength Training Zone at FITNESS18 — a space designed for serious results and smart training. Equipped with state-of-the-art Nautilus machines, each station targets specific muscle groups to help you train with precision, safety, and control. Whether you're working on your legs, arms, back, or core, our ergonomic and"
      />
      </div>
      <div className="py-2 md:py-4 lg:py-5 px-4">
      <AnimatedCard
        type="cardio"
        title="CARDIO"
        description="Step into the Strength Training Zone at FITNESS18 — a space designed for serious results and smart training. Equipped with state-of-the-art Nautilus machines, each station targets specific muscle groups to help you train with precision, safety, and control. Whether you're working on your legs, arms, back, or core, our ergonomic and"
      />
    </div>
    </>
  );
}
