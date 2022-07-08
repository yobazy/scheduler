import React from "react";
import DayListItem from "./DayListItem.js"


export default function DayList(props) {
  console.log(props.value)
  const listDays = props.days.map((day) => {
  return <DayListItem         
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.value}
    setDay={props.setDay}  
  />;
  });
  return <ul>{listDays}</ul>;
};