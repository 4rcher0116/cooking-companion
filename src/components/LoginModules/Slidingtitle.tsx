import { motion } from "framer-motion";
import { CSSProperties } from "react";

type SlidingTitleProps = {
  text: string;
  fontFamily?: string; 
  color: CSSProperties["color"]
};

const SlidingTitle: React.FC<SlidingTitleProps> = ({ text, fontFamily, color }) => {
  return (
    <motion.h1
      style={{ fontFamily: fontFamily, color: color, }}
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
    >
      {text}
    </motion.h1>
  );
};

export default SlidingTitle;

