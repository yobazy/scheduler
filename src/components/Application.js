import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment"
import useApplicationData from "hooks/useApplicationData"

// import getAppointmentsForDay from "src/helpers/selectors.js";
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from "../helpers/selectors.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // } 

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
      console.log("🚀 ~ file: Application.js ~ line 36 ~ ]).then ~ all", all)
      console.log('all', all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {    
      setState({
      ...state,
      appointments
    });})
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, {appointment}).then(() => {    
      setState({
      ...state,
      appointments
      })}
    );
  }

  const interviewers = getInterviewersForDay(state, state.day);
  
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );
  
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
            <DayList days={state.days} day={state.day} setDay={setDay} />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </section>
        <section className="schedule">
          <section className="schedule">
            {appointments}
            <Appointment key="last" time="5pm" />
          </section>
        </section>
      </main>
    );
  }
