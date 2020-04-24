import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Employee.css"
import { EmployeeContext } from "./EmployeeProvider"
export default (props) => {
    const [modal, setModal] = useState(false)
    const { fireEmployee } = useContext(EmployeeContext)
    const toggle = () => setModal(!modal)
    const chosenEmployeeId = props.employee.id
    let history = useHistory()


    return (
        <>
        <section className="employee">
            <h3 className="employee__name">{props.employee.name}</h3>
            <button onClick={toggle}>Details</button>
            <button className="btn--release"
                        onClick={() => {
                            fireEmployee(chosenEmployeeId)
                                .then(() => {
                                    history.push("/")
                                })
                        }}
                >Fire</button>
        </section>
        
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {props.employee.name}
            </ModalHeader>
            <ModalBody>
                <div className="employee__address">Address: {props.employee.address}</div>
                <div className="employee__location">Location working: {props.location.name}</div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
        </>
    )
}