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
function ItemList({ data }) {
  return (
    <div>
      {data.map((datum) => (
        <Item key={datum} content={datum}></Item>
      ))}
    </div>
  );
}

ItemList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ItemList;
