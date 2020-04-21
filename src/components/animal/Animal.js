import React from "react"
import "./Animals.css"

export default (props) => (
    <section className="animal">
        <h3 className="animal__name">{props.animal.name}</h3>
        <div className="animal__breed">{props.animal.breed}</div>
        <div className="animal__location">Location: {props.location.name}</div>
        <div className="animal__owner">Customer: {props.customer.name}</div>
    </section>
)