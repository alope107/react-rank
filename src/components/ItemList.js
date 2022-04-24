import { Reorder } from "framer-motion";

import Item from "./Item";

function ItemList({ data, setData }) {
  return (
    <div>
      <Reorder.Group values={data} onReorder={setData}>
        {data.map((datum) => (
          <Reorder.Item
            key={datum}
            value={datum}
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
            <Item key={datum} title={datum}></Item>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

export default ItemList;
