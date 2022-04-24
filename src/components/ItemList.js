import { Reorder } from "framer-motion";

import Item from "./Item";

function ItemList({ data, setData }) {
  return (
    <div>
      <Reorder.Group values={data} onReorder={setData}>
        {data.map((datum) => (
          <Item key={datum} title={datum}></Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

export default ItemList;
