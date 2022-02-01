import React, { Fragment } from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "components/Appointment/styles.scss";
import useVisualMode from "components/hooks/useVisualMode";
import Form from "./Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"



export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  useVisualMode(mode);

  console.log(props)
  // const formatTime = (props) => {
  //   if (props.time) {
  //     return `Appointment at ${props.time}`
  //   } else {
  //     return "No Appointments"
  //   }
  // }

  function save(student, interviewer) {
    const interview = {
      student,
      interviewer
    };
    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(()=> transition(SHOW))
      // .catch((err) => console.log(err))

  }

  return (
    <article className="appointment">
      <Header time={props.time} /> 
      {/* {props.interview ? <Show student= {props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>} */}

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
      <Form 
      interviewers= {props.interviewers}
      onSave= {save}
      onCancel= {back}
      />
    )}
    </article>

  )
}