import React from "react";
import "components/InterviewerListItem.scss";

export default function Interviewer(props)  {

  let intClass = "interviewers__item"
  if(props.selected)  {
    intClass += "--selected"
  }
  return (
    <li className={intClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}