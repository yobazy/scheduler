import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Form from "components/Appointment/Form.js"
// import Create from "components/Appointment/Create.js"
import useVisualMode from "hooks/useVisualMode.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    const id = 1
    // props.bookInterview(id, interview)
    // transition(EMPTY)
    // return interview;
    console.log("🚀 ~ file: index.js ~ line 25 ~ save ~ interview", interview)
  }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const onAdd = () => {
    transition(CREATE)
  }

  const onCancel = () => {
    transition(EMPTY)
  }
  
  return (<article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === CREATE && (
      <Form 
      student={props.student} 
      interviewer={props.interviewer} 
      interviewers={props.interviewers} 
      onCancel={back}
      onSave={save}/>
    )}
    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />
    )}
  </article>);
}