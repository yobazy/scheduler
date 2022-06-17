import React from "react";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = "day-list__item";
  if (props.selected) {
    dayClass += "--selected";
  }
  if (props.spots === 0) {
    dayClass += "--full";
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}