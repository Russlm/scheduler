import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "components/Appointment/styles.scss";
import useVisualMode from "components/hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = 'CONFIRM';
const EDIT = "EDIT ";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



export default function Appointment(props) {

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY 
  );


  useVisualMode(mode);

  // console.log(props)
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
      .catch(() => transition(ERROR_SAVE, true))

  }
  function destroy() {

    transition(DELETING)

    props.deleteInterview(props.id)
      .then(()=> transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))

  }

  function confirmation() {
    transition(CONFIRM)
  }

  function manageEditing() {

    transition(EDIT)
  }


  return (
    <article className="appointment">
      <Header time={props.time} /> 

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirmation}
        onEdit={manageEditing}
      />
    )}
    {mode === CREATE && (
      <Form 
      interviewers= {props.interviewers}
      onSave= {save}
      onCancel= {back}
      />
    )}
    {mode === SAVING && ( <Status message= {"Saving"} />)}
    {mode === DELETING && (<Status message= {"Deleting"} />)}
    {mode === CONFIRM && (
      <Confirm 
        onCancel={back}
        onConfirm={destroy}
        message={"Are you sure you would like to cancel?"}
      />
    )}
    {mode === EDIT && (
      <Form 
      name={props.interview.student}
      interviewers={props.interviewers}
      interviewer={props.interview.interviewer.id}
      onSave={save}
      onCancel={back}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error 
        message={"Unfortunately, we couldn't save your appointment. Please Try Again Later."}
        onClose={back}
        />
    )}
    {mode === ERROR_DELETE && (
      <Error 
        message={"Unfortunately, we couldn't delete your appointment. Please Try Again Later."}
        onClose={back}
        />
    )}
    </article>

  )
}