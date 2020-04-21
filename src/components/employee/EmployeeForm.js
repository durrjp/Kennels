import React, { useContext, useRef } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"
import "./EmployeeForm.css"

export default props => {
    const { constructNewEmployee } = useContext(EmployeeContext)
    const { locations } = useContext(LocationContext)
    const employeeName = useRef("")
    const address = useRef("")
    const employeeLocation = useRef(0)


    return (
        <form className="employeeForm">
            <button onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        props.toggle()
                    }
                }>x</button>
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset className="form-group">
                <label htmlFor="employeeName">Employee name</label>
                <input
                    type="text"
                    id="employeeName"
                    ref={employeeName}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Employee name"
                />
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeAddress">Address: </label>
                    <input
                        type="text"
                        id="employeeAddress"
                        ref={address}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Street address"
                    />
                </div>
            </fieldset>
            <fieldset className="form-group">
                <label htmlFor="location">Assign to location</label>
                <select
                    defaultValue=""
                    name="location"
                    ref={employeeLocation}
                    id="employeeLocation"
                    className="form-control"
                >
                    <option value="0">Select a location</option>
                    {locations.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
            </fieldset>
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        constructNewEmployee(employeeLocation, employeeName, address)
                        props.toggle()
                    }
                }
                className="btn btn-primary">
                Save Employee
            </button>
        </form>
    )
}