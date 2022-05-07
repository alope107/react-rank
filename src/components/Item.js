import PropTypes from "prop-types";

import { motion } from "framer-motion";

function Item({ content }) {
  return (
    <motion.div
      layout
      key={content}
      value={content}
      dragListener={false}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        // animation on entry
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 700,
          damping: 15,
        },
      }}
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
};

export default Item;
