"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];


export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
  as = "div",
  once = true,
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </MotionTag>
  );
}


// export function Parallax({
//   children,
//   className = "",
//   from = 0,
//   to = -60,
//   start = 0,
//   end = 900,
// }) {
//   const reduce = useReducedMotion();
//   const { scrollY } = useScroll();
//   const rawY = useTransform(scrollY, [start, end], [from, to]);
//   const y = useSpring(rawY, { stiffness: 90, damping: 30, restDelta: 0.5 });

//   if (reduce) return <div className={className}>{children}</div>;

//   return (
//     <motion.div className={className} style={{ y }}>
//       {children}
//     </motion.div>
//   );
// }


export function Counter({
  to,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-US");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}


// export function ScrollProgress() {
//   const reduce = useReducedMotion();
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 120,
//     damping: 30,
//     restDelta: 0.001,
//   });

//   return (
//     <motion.div
//       aria-hidden="true"
//       className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
//       style={{ scaleX: reduce ? scrollYProgress : scaleX }}
//     />
//   );
// }
