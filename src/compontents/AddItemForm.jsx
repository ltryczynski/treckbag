import { useState, useRef } from "react";
import Button from "./Button";
import { useItemStore } from "../stores/itemsStore";

export default function AddItemForm() {
  const [inputValue, setInputValue] = useState("");
  const addItem = useItemStore((state) => state.addItem);
  const inputRef = useRef(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!inputValue) {
      alert("Item can't be empty");
      inputRef.current.focus();
      return;
    }

    addItem(inputValue);
    setInputValue("");
  };
  return (
    <section>
      <h2>Add an item</h2>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder="Toothbrush"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          autoFocus
          ref={inputRef}
        />
        <Button className="btn">Add to list</Button>
      </form>
    </section>
  );
}
