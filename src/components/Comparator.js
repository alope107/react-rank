function Comparator({ unpause, pair }) {
  return (
    <div>
      <button onClick={() => unpause(true)}>{pair[0]}</button>
      <button onClick={() => unpause(false)}>{pair[1]}</button>
    </div>
  );
}

export default Comparator;
