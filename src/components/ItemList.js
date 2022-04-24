import Item from "./Item";

function ItemList({ data }) {
  const items = data.map((e) => <Item key={e} title={e}></Item>);

  return <div>{items}</div>;
}

export default ItemList;
