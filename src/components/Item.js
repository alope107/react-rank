import PropTypes from "prop-types";

import { Reorder } from "framer-motion";

function Item({ content }) {
  return (
    <Reorder.Item
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
        stiffness: 300,
        damping: 30,
      }}
    >
      <h1>{content}</h1>
    </Reorder.Item>
  );
}

Item.propTypes = {
  content: PropTypes.any.isRequired,
};

export default Item;
