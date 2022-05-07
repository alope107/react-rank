import PropTypes from "prop-types";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function Item({ content }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(() => ({
      // animation on entry
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 700,
        damping: 15,
      },
    }));
  }, []);

  // Flash red background and then go back to transparent
  const flash = () => {
    controls.start({
      backgroundColor: [
        "rgba(255, 0, 0, 0)",
        "rgba(255, 0, 0, 1)",
        "rgba(255, 0, 0, 0)",
      ],
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  };

  return (
    <motion.div
      layout
      key={content}
      value={content}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{
        //animation on reorder
        type: "spring",
        stiffness: 500,
        damping: 20,
      }}
      onClick={flash}
    >
      <h1>{content}</h1>
    </motion.div>
  );
}

Item.propTypes = {
  content: PropTypes.any.isRequired,
};

export default Item;
