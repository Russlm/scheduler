import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));



  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data }));
    })
  },[])

  // const updateSpots = (id, remove) => {
  //   const selectedDay = state.days.find(eachDay => eachDay.name === day);
  //   if (remove) {
  //     const spots = selectedDay.spots
  //     selectedDay.spots = spots - 1
  //     console.log(spots)
  //   }
  //   const spots = selectedDay.spots
  //     selectedDay.spots = spots + 1
  //     console.log(spots)
  // }
  console.log("============", state.days)

  const updateSpots = (requestType) => { 
    const days = state.days.map(day => {
      if (day.name === state.day) {
        if (requestType === 'bookAppointment') {
          return { ...day, spots: day.spots - 1  }
        } else {
          return { ...day, spots: day.spots + 1  }
        }
      } else {
        return { ...day }
      }
    });
    return days;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      // interview: { ...interview }
    };

    const book = appointment.interview
    appointment.interview = { ...interview }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let days = [...state.days]
    
    return axios.put(`/api/appointments/${id}`, appointments[id]) 
      .then(() => {
        if (!book) {
           days = updateSpots('bookAppointment')
        }
        setState({
          ...state,
          appointments, 
          days
        });
    });
      
  }

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.delete(`/api/appointments/${id}`) 
      .then(() => {
        const days = updateSpots()
        setState({
          ...state,
          appointments, 
          days
        });
      }) 
  }

  return {
    state, 
    setDay, 
    bookInterview,
    deleteInterview
  }
}