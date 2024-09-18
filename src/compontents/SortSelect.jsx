import React from "react";
import Select from "react-select";

export default function SortSelect({ sortBy, setSortBy, sortingOptions }) {
  return (
    <section className="sorting">
      <Select
        defaultValue={sortBy}
        onChange={(option) => setSortBy(option)}
        options={sortingOptions}
      />
    </section>
  );
}
