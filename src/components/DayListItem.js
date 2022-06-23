import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
console.log("🚀 ~ file: DayListItem.js ~ line 6 ~ DayListItem ~ props", props)
  
  const formatSpots = function(spots)  {
    if (spots === 0){
      return "no spots";
    };
    if (spots === 1){
      return "1 spot";
    };
    return spots+" spots";
  };

  const dayListItemClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  // let dayClass = "day-list__item";
  // if (props.selected) {
  //   dayClass += "--selected";
  // }
  // if (props.spots === 0) {
  //   dayClass += "--full";
  // }


  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}