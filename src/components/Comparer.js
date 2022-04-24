import Item from "./Item";

function Comparer({ items, setShouldSwap }) {
  console.log("Re-render comparer");
  return (
    <div>
      <h1>Choose your fighter</h1>
      <button onClick={() => setShouldSwap(true)}>
        <Item title={items[0]}></Item>
      </button>
      <button onClick={() => setShouldSwap(false)}>
        <Item title={items[1]}></Item>
      </button>
    </div>
  );
}

export default Comparer;
