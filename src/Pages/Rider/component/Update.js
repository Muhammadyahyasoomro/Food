import React, { useState } from "react";

export default function Update({ btnText = "Update", btnColor = "primary" }) {
  const [cbtnText, setbtnText] = useState(btnText);
  const [cbtncolor, setbtncolor] = useState(btnColor);

  return (
    <div
      style={{
        margin: 10,
        textAlign: "center",
      }}
    >
      <button
        type="button"
        className={cbtncolor}
        style={{ paddingLeft: 50, paddingRight: 50 }}
      >
        {cbtnText}
      </button>
    </div>
  );
}
