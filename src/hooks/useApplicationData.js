import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
  } 

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
    setState({
      ...state,
      appointments
    });
  }

  const cancelInterview = {

  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};