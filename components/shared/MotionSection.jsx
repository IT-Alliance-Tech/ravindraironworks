"use client";
import React from "react";
import { motion } from "framer-motion";
import useIntersection from "../../lib/useIntersection";
const container = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
export default function MotionSection({ children, as: As = "section", className = "", threshold = 0.15, delay = 0 }) {
  const { ref, inView } = useIntersection({ threshold });
  const MotionEl = motion[As] || motion.div;
  return (
    <MotionEl
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={container}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </MotionEl>
  );
}
