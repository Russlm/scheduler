import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots 
  });

  return (
    <li 
      className={dayClass}
    >
      <h2 className="text--regular">Day Name</h2> 
      <h3 className="text--light">X spots remaining</h3>
    </li>
  );
}

