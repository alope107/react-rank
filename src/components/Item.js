import "./Item.css";
import PropTypes from "prop-types";

import { motion } from "framer-motion";

function Item({ content, selected }) {
  // The animation characteristics shared between whether
  // it's selected or not
  const baseAnim = {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 700,
      damping: 15,
    },
  };

  const variants = {
    unselected: {
      x: 0,
      ...baseAnim,
    },
    selected: {
      x: 20,
      ...baseAnim,
    },
  };

  return (
    <motion.div
      layout
      className="itemDiv"
      key={content}
      value={content}
      initial={{ opacity: 0, y: 30 }}
      animate={selected ? "selected" : "unselected"}
      variants={variants}
      transition={{
        //animation on reorder
        type: "spring",
        stiffness: 500,
        damping: 20,
      }}
    >
      <h1>{content}</h1>
    </motion.div>
  );
}

Item.propTypes = {
  content: PropTypes.any.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Item;
