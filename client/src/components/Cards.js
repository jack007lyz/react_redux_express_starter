import Modal from "./Modal";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Cards(props) {

    const [modal, setModal] = useState(false);

// https://codepen.io/gaearon/pen/GjPyQM?editors=0011
let temp = props.ingredients;
let listItems = temp.map((numbers) =>
  <li key={uuidv4()}>{numbers.toString()}</li>
);

let temp2 = props.instructions;
let listItems2 = temp2.map((numbers) =>
    <li key={uuidv4()}>{numbers.toString()}</li>
);
    return (
        <div>
            <ul><div key={uuidv4()}>{props.title}</div>
                <ul key={uuidv4()}>{listItems}</ul>
                <ol key={uuidv4()}>{listItems2}</ol>
            </ul>
            <button onClick={() => setModal(true)}>Show Details</button>
            <Modal onClose = {() => setModal(false)} show = {modal} details = {listItems2} title = {props.title}/>
	    </div>
    );
}