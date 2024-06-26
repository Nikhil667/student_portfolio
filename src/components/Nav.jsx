import React, { useState } from "react";

import clsx from "clsx";

import all from "/icons/ListBullets.svg";
import like from "/icons/ListHeart.svg";

export default function Nav() {
  const [activeButton, setActiveButton] = useState("");

  function handleActiveState(event) {
    setActiveButton(event.target.id);
  }

  return (
    <div className="nav-button-container flex gap-4">
      <div className="all-summary-btn">
        <button
          className={clsx(
            "btn text-sm font-semibold px-1 py-2 flex items-center gap-1 rounded",
            {
              "border-2 border-yellow-400 bg-yellow-100": activeButton === "1",
            }
          )}
          id={"1"}
          key={1}
          onClick={handleActiveState}
        >
          <img src={all} alt="all" />
          All Summaries
        </button>
      </div>
      <div className="like-summary-btn">
        <button
          className={clsx(
            "btn text-sm font-semibold px-1 py-2 flex items-center gap-1 rounded",
            {
              "border-2 border-yellow-400 bg-yellow-100": activeButton === "2",
            }
          )}
          id={"2"}
          key={2}
          onClick={handleActiveState}
        >
          <img src={like} alt="like" />
          Liked Summaries
        </button>
      </div>
    </div>
  );
}
