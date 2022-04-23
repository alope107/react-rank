import Item from "./Item";

function Comparer({ items, handleSelect }) {
  const buttons = items.map((element, idx) => (
    <button key={idx} onClick={() => handleSelect(element)}>
      <Item title={element}></Item>
    </button>
  ));
  return (
    <div>
      <h1>Choose your fighter</h1>
      {buttons}
    </div>
  );
}

export default Comparer;
