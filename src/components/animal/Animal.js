import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Animals.css"

export default ({ animal, customer, location }) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return (
        <>
            <section className="animal">
                <h3 className="animal__name">{animal.name}</h3>
                <button onClick={toggle}>Details</button>
            </section>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {animal.name}
                </ModalHeader>
                <ModalBody>
                    <div className="animal__breed">
                        <label className="label--animal">Breed:</label> {animal.breed}
                    </div>
                    <div className="animal__location">
                        <label className="label--animal">Location:</label> {location.name}
                    </div>
                    <div className="animal__owner">
                        <label className="label--animal">Customer:</label> {customer.name}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}