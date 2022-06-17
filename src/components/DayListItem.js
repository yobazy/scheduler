import React from "react";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = function(spots)  {
    if (spots === 0){
      return "no spots";
    };
    if (spots === 1){
      return "1 spot";
    };
    return spots+" spots";
  };
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
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}