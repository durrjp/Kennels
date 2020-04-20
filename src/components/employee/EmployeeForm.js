import React, { useContext, useRef } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"

export default props => {
    const { constructNewEmployee } = useContext(EmployeeContext)
    const { locations } = useContext(LocationContext)
    const employeeName = useRef("")
    const employeeLocation = useRef(0)


    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <div className="form-group">
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
            </div>
            <div className="form-group">
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
            </div>
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        constructNewEmployee(employeeLocation, employeeName)
                    }
                }
                className="btn btn-primary">
                Save Employee
            </button>
        </form>
    )
}