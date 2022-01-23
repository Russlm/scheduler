import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listItem = props.days.map( x => (
    <DayListItem 
    key={x.id}
    name={x.name} 
    spots={x.spots} 
    selected={x.name === props.day}
    setDay={x.setDay}  
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