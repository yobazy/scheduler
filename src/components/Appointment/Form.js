import React, { useState } from 'react';
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList";

export default function Form()  {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = function() {
    setStudent("")
    setInterviewer(null)
  }
  const cancel = function() {
    reset()
    props.onCancel
  }
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
          your code goes here
        */
       onChange={(event) => setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger={action(cancel())}>Cancel</Button>
      <Button confirm>Save</Button>
    </section>
  </section>
</main>
  )
}