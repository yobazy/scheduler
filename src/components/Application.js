import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment"

import getAppointmentsForDay from "helpers/selectors.js";

const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
  // you may put the line below, but will have to remove/comment hardcoded appointments variable
  // appointments: {}
});
const appointments = getAppointmentsForDay(state, day);

const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
  );
});

useEffect(() => {
  //axios request here...
  let daysURL = 'http://localhost:8001/api/days'
  let appURL = 'http://localhost:8001/api/appointments'
  let intURL = "http://localhost:8001/api/interviewers"
  Promise.all([
    axios.get(daysURL),
    axios.get(appURL),
    axios.get(intURL)
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0], appointments: all[1], interviewers: all[2]}));
  });
}, []);

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => {
    //... your code here ...
    setState(prev => ({ ...prev, days }));
}
  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />{/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appointment) => {
        <Appointment 
        key={appointment.id} 
        {...appointment} 
        />  
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
