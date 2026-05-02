function Stats({ items }) {
  if (items.length === 0)
    return (
      <footer className="stats">
        "Start adding some items to your packing list🚀"
      </footer>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      {percentage === 100
        ? "You got everything! Ready to go 🛩️"
        : `🧳 You have ${numItems} item on your list and you already packed ${numPacked}(${percentage}%).`}
    </footer>
  );
}

export default Stats;