import React, { Fragment } from 'react'
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Form from "components/Appointment/Form.js"
import Error from "components/Appointment/Error.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"
import useVisualMode from "hooks/useVisualMode.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function remove() {
    if (mode === CONFIRM) {
      transition(DELETING, true)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
    } else {
      transition(CONFIRM);      
    }
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);
  
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function edit() {
    transition(EDIT);
  }
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
      interviewers={props.interviewers} 
      onCancel={back}
      onSave={save}/>
    )}
    {mode === SAVING && <Status message="Saving" />}
    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={edit}
      onDelete={remove}
      />
    )}
    {mode === DELETING && <Status message="Deleting" />}
    {mode === CONFIRM && 
        <Confirm 
          onCancel={back}
          onConfirm={remove}
          message="Are you sure you would like to delete?" 
        />}
    {mode === EDIT &&
        <Form 
          name={props.name ? props.name : props.interview.student}
          value={props.value ? props.value: props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
        {mode === ERROR_SAVE && 
    <Error 
      message="Could not create appointment"
      onClose={back}
    />
  }
  {mode === ERROR_DELETE && 
    <Error 
      message="Could not cancel appointment"
      onClose={back}
    />
  }
  </article>);
}