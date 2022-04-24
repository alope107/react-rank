import { Reorder } from "framer-motion";

import Item from "./Item";

/**
 * Displays of list of Items. Items will animate on enter/reorder
 * based on the configuration in the Item component.
 *
 * @param {Object} props
 * @param {Array} props.data
 * @returns
 */
function ItemList({ data }) {
  // TODO(auberon): Investigate whether the Reorder.Group is even needed.
  return (
    <div>
      <Reorder.Group values={data} onReorder={() => {}}>
        {data.map((datum) => (
          <Item key={datum} title={datum}></Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

export default ItemList;
