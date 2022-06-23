export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let appArr = [];
  let apps;
  // iterate over all the days 
  if (state.days.length == 0)  {
    return appArr;
  }
  for (let dayObj of state.days)  {
    if (dayObj.name === day)  {
      apps = dayObj.appointments;
    }
  }
  if (typeof apps == 'undefined')  {
    appArr = []
    return appArr;
  }
  for (let id of apps)  {
    appArr.push(state.appointments[id]);
  }
  return appArr;
}

export function getInterviewsForDay(state, day) {
  let appArr = getAppointmentsForDay(state, day)
  //... returns an array of appointment objects for that day
  let intArr = [];
  let ints;
  // iterate over all the days 
  if (appArr.length == 0)  {
    return intArr;
  }
  return appArr;
}
  
export function getInterviews(state, interview) {
  if (interview == null) {
    return null;
  }
  let interviewArr = {};
  interviewArr.student = interview.student;

  const interviewerID = interview.interviewer 
  const interviewers = state.interviewers
  interviewArr.interviewer = interviewers[interviewerID];
  return interviewArr;
}

