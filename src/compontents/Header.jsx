import Counter from "./Counter";
import Logo from "./Logo";
import { useItemStore } from "../stores/itemsStore";

export default function Header() {
  const items = useItemStore((state) => state.items);

  return (
    <header>
      <Logo />
      <Counter
        packedNumberOfItems={items.reduce((acc, cur) => (cur.packed ? acc + 1 : acc), 0)}
        totalNumberofItems={items.length}
      />
    </header>
  );
}
