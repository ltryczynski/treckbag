import React from "react";

export default function Counter({ totalNumberofItems, packedNumberOfItems }) {
  return (
    <div>
      {packedNumberOfItems || 0} / {totalNumberofItems || 0} Items packed
    </div>
  );
}
