import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {

  const formatTime = (props) => {
    if (props.time) {
      return `Appointment at ${props.time}`
    } else {
      return "No Appointments"
    }
  }
  return (
    <article className="appointment">{formatTime(props)}</article>
  )
}