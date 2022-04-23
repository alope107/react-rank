import Item from "./Item";

function ItemList({ data }) {
  const items = data.map((e, i) => <Item key={i} title={e}></Item>);

  return <div>{items}</div>;
}

export default ItemList;
