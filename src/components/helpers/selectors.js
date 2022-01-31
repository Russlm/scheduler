export function getAppointmentsForDay(state, day) {
  if (!day) {
    return [];
  }
  if (!state.days[0]) {
    return []
  }
  if (!state.days.map(days => days.name).includes(day)) {
    return [];
  }
  // const selectedDay = state.days.filter(x => x.name === day)[0]
  const selectedDay = state.days.find(eachDay => eachDay.name === day)
  // console.log(`appt is ${JSON.stringify(appt)}`)
  
  const output= selectedDay.appointments.map(appointmentID => state.appointments[appointmentID])

  return output
}


export function getInterview (state, interview) {

  if (!interview) {
    return null
  }
  const interviewerID = interview['interviewer']
  const output = {}
  output.interviewer = {... state['interviewers'][interviewerID]}
  // console.log(`output is ${JSON.stringify(output)}`)
  output.student = interview.student 
  // console.log(`output is ${JSON.stringify(output)}`)
  return output
}

export function getInterviewersForDay(state, day) {
  if (!day) {
    return [];
  }
  if (!state.days[0]) {
    return []
  }
  if (!state.days.map(days => days.name).includes(day)) {
    return [];
  }
  const todaysInterviewerIDs = state.days.filter(x => x.name === day)[0].interviewers

  
  const output= dailyInterviewerID.map(entry => state["interviewers"][entry])

  
  return output
}