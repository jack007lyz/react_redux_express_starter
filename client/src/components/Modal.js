import './Modal.css';
import React, { useState } from "react";
export default function Modal(props) {
    if(!props.show) {
        return null;
    }
    console.log(props.details);
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{props.title}</h3>
                    <h4>Detailed instructions</h4>
                </div>
                <div className="modal-body">
                    <ol>{props.details}</ol>
                </div>
            <button onClick={props.onClose}>Close</button>
        </div>
        </div>
    );
}