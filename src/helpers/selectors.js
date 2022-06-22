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
  console.log('Apps', apps)
  if (typeof apps == 'undefined')  {
    appArr = []
    return appArr;
  }
  console.log(typeof apps == 'undefined')
  for (let id of apps)  {
    console.log(state.appointments[id])
    appArr.push(state.appointments[id]);
  }
  return appArr;
}
  
export function getInterviews(state, interview) {

// }
  // for (let id of apps)  {
  //   appArr.push(state.appointments[id])
  //   // for (let appointment of state.appointments)  {
  //   //   if (id === state.appointments)  {
  //   //     appArr[id] = state.app
  // }
  // // }
  //   // for each app in states.appointments
  //   // if (id = )
  // return appArr;
}