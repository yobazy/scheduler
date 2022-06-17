import React from "react";
import InterviewerListItem from "./InterviewerListItem.js"
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  // const listInterviewers = props.interviewers.map((day) => {
  // return <InterviewerListItem
  // id=
  // name=
  // avatar=
  // />
  // });
  // return <ul>{listInterviewers}</ul>;
  const listInterviewers = props.interviewers.map((interviewer) => {
  return <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.selected}
    />
  });
  return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{listInterviewers}</ul>
</section>)
};