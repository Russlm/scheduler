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
  const calendar = state["days"].filter(x => x.name === day)
  const appt = calendar[0].appointments
  console.log(`appt is ${JSON.stringify(appt)}`)
  
  const output= appt.map(entry => state["appointments"][entry])
  console.log(`appt is ${JSON.stringify(output)}`)
  // const output = []
  // for (let entry in appt ) {
  //   output.push(state["appointments"][entry])
  // }
  // console.log(`output is ${JSON.stringify(output)}`)
  
  return output
}