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
  const updateSpots = () => { 
    axios.get('api/days')
      .then((res) => {
        setState(prev => ({...prev, days: res.data}));
      })
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    
    return axios.put(`/api/appointments/${id}`, appointments[id]) 
      .then(() => {
        setState({
          ...state,
          appointments, 
        })
        updateSpots()
    }) 
      
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
        setState({...state, appointments});
        updateSpots()
      }) 
  }

  return {
    state, 
    setDay, 
    bookInterview,
    deleteInterview
  }
}