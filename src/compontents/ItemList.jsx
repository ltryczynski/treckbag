import { useState } from "react";

import EmptyView from "./EmptyView";
import SortSelect from "./SortSelect";

import { sortingOptions } from "../lib/lib";
import { useItemStore } from "../stores/itemsStore";

export default function ItemList() {
  const [sortBy, setSortBy] = useState(sortingOptions[0]);
  const items = useItemStore((state) => state.items);
  const deleteItem = useItemStore((state) => state.deleteItem);
  const toggleItem = useItemStore((state) => state.toggleItem);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy.value === "packed") return b.packed - a.packed;
    else if (sortBy.value === "unpacked") return a.packed - b.packed;
    return 0;
  });
  return (
    <ul className="item-list">
      {sortedItems.length === 0 && <EmptyView />}

      {sortedItems.length > 1 && (
        <SortSelect sortBy={sortBy} setSortBy={setSortBy} sortingOptions={sortingOptions} />
      )}

      {sortedItems.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={() => deleteItem(item.id)}
          onToggleItem={() => toggleItem(item.id)}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className="item">
      <label>
        <input type="checkbox" checked={item.packed} onChange={onToggleItem} />
        {item.name}
      </label>
      <button onClick={onDeleteItem}>❌</button>
    </li>
  );
}
