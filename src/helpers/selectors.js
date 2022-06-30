export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find(d => d.name === day)
  if (!foundDay) return [];
  return foundDay.appointments.map(id => state.appointments[id])
}

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find(d => d.name === day)
  if (!foundDay) return [];
  return foundDay.interviewers.map(id => state.interviewers[id])
}
  
export function getInterview(state, interview) {
  if (interview == null) {
    return null;
  }
  return {...interview, interviewer: state.interviewers[interview.interviewer]}
  // let interviewArr = {};
  // interviewArr.student = interview.student;

  // const interviewerID = interview.interviewer 
  // const interviewers = state.interviewers
  // interviewArr.interviewer = interviewers[interviewerID];
  // return interviewArr;
}

