import { Reorder } from "framer-motion";

function Item({ title }) {
  return (
    <Reorder.Item
      key={title}
      value={title}
      dragListener={false}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 700,
          damping: 15,
        },
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <h1>{title}</h1>
    </Reorder.Item>
  );
}

export default Item;
