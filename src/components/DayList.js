import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listItem = props.days.map( day => (
    <DayListItem 
    key={day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={day.setDay}  
  />
  ))
  return(
    <ul>
         {listItem}  
    </ul>
  )
};




// FIRST ATTEMPT 
// // return (
//   <ul>{props.days.map( x => {
//     <ul>
//     <li>{x.id}</li>
//     <li>{x.name}</li>
//     <li>{x.days === props.day}</li>
//     <li>{x.setDay}</li>
//     </ul>
//   }
    
//     )}</ul>
// )