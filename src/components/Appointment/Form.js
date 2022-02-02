import React  from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";


export default function Form(props) { 
  const [student, setStudent] = useState(props.student || "");
  console.log(props.interviewer)
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');
  const reset = () => { 
    setStudent("") 
    setInterviewer("")
  };  
  const cancel = ()=> {
    reset() 
    props.onCancel()
  }

  function save() {

    if(!student) {
      setError("Student name should not be empty.")
      return
    }

    if(!interviewer) {
      setError("Please select an interviewer!")
      return
    }
    props.onSave(student, interviewer)
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <div style={{ color: "red" }}>{error}</div> 
        <form 
          autoComplete="off"
          onSubmit={event => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value= {student}
            onChange={event => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          value= {interviewer}
          interviewers = {props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick= {cancel}>Cancel</Button>
          <Button confirm onClick= {save}>Save</Button>
        </section>
      </section>
    </main>
  )
}