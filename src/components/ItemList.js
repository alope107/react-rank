import PropTypes from "prop-types";

import Item from "./Item";

/**
 * Displays of list of Items. Items will animate on enter/reorder
 * based on the configuration in the Item component.
 *
 * @param {Object} props
 * @param {Array} props.data
 * @returns
 */
function ItemList({ data, pair }) {
  return (
    <div>
      {data.map((datum, i) => (
        <Item key={datum} content={datum} selected={pair.includes(i)}></Item>
      ))}
    </div>
  );
}

ItemList.propTypes = {
  data: PropTypes.array.isRequired,
  pair: PropTypes.array.isRequired,
};

export default ItemList;
