
export function getInterview (state, interview) {

  if (!interview) {
    return null;
  }
  const interviewerID = interview.interviewer
  const interviewObj = {
    student: interview.student,
    interviewer: {...state.interviewers[interviewerID]}
  }
  return interviewObj;
}


export function getAppointmentsForDay(state, day) {
  if (!day) {
    return [];
  }
  if (!state.days[0]) {
    return []
  }

  const dayExists = state.days.map(days => days.name).includes(day);

  if (!dayExists) {
    return [];
  }
  // const selectedDay = state.days.filter(x => x.name === day)[0]
  const selectedDay = state.days.find(eachDay => eachDay.name === day);
  // console.log(`appt is ${JSON.stringify(appt)}`)
  
  const appointmentsForDay= selectedDay.appointments.map(appointmentID => state.appointments[appointmentID]);

  return appointmentsForDay;
}

export function getInterviewersForDay(state, day) {
  if (!day) {
    return [];
  }
  if (!state.days[0]) {
    return [];
  }
  const dayExists =state.days.map(days => days.name).includes(day);
  if (!dayExists) {
    return [];
  }

  const selectedDay = state.days.find(eachDay => eachDay.name === day);
  // const todaysInterviewerIDs = state.days.filter(x => x.name === day)[0].interviewers

  const interviewersForDay= selectedDay.interviewers.map(interviewerID => state.interviewers[interviewerID]);

  
  return interviewersForDay;
}