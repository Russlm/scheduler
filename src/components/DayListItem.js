import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots 
  });

  const formatSpots = (props) => {
    if (props.spots === 0) {
      return "no spots remaining"
    } 
    if (props.spots === 1) {
      return "1 spot remaining"
    } else {
      return `${props.spots} spots remaining`
    }
  }


  return (
    <li 
      className={dayClass}
    >
      <h2 className="text--regular">Day Name</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}

