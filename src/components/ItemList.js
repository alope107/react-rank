import { Reorder } from "framer-motion";

import Item from "./Item";

function ItemList({ data, setData }) {
  //const items = data.map((e) => <Item key={e} title={e}></Item>);

  //return <div>{items}</div>;

  return (
    <div>
      <Reorder.Group values={data} onReorder={setData}>
        {data.map((datum) => (
          <Reorder.Item key={datum} value={datum} dragListener={false}>
            <Item key={datum} title={datum}></Item>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

export default ItemList;
/*

import { useState } from "react";
import { Reorder } from "framer-motion";

export default function App() {
  const [items, setItems] = useState([0, 1, 2, 3]);

  const swap = () => {
    const newItems = [...items];
    [newItems[0], newItems[1]] = [newItems[1], newItems[0]];
    setItems(newItems);
  };

  return (
    <div>
      <Reorder.Group values={items} onReorder={setItems}>
        {items.map((item) => (
          <Reorder.Item key={item} value={item} dragListener={false}>
            {item}
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <button onClick={swap}>swap</button>
    </div>
  );
}

*/
