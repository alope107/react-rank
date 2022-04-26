import "./Comparator.css";
import PropTypes from "prop-types";

/**
 * Presents the user with two buttons for the pair of
 * provided items. Uses the provided compare button
 * to show when a user selects one of the two items.
 * Passes true when the user picks the first item, false otherwise.
 *
 * @param {Object} props
 * @param {function(boolean)} props.compare
 * @param {Array} props.pair
 * @returns
 */
function Comparator({ compare, pair }) {
  return (
    <div id="compButtonHolder">
      <button onClick={() => compare(true)}>{pair[0]}</button>
      <button onClick={() => compare(false)}>{pair[1]}</button>
    </div>
  );
}

Comparator.propTypes = {
  compare: PropTypes.func.isRequired,
  pair: PropTypes.array.isRequired,
};

export default Comparator;
