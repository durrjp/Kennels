import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import "./Animals.css"
import { AnimalContext } from "./AnimalProvider"
import { EditAnimalForm } from "./EditAnimalForm"

export default (props) => {
    const { releaseAnimal } = useContext(AnimalContext)
    const chosenAnimalId = props.animal.id
    let history = useHistory()
    // Toggle details modal
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    // Toggle edit modal
    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    return (
        <>
            <section className="animal">
                <h3 className="animal__name">{props.animal.name}</h3>
                <button onClick={toggle}>Details</button>
                <button className="btn--release"
                        onClick={() => {
                            releaseAnimal(chosenAnimalId)
                                .then(() => {
                                    history.push("/animals")
                                })
                        }}
                >Release</button>
            </section>

            <Modal isOpen={modal} toggle={toggle} toggleEdit={toggleEdit}>
                <ModalHeader toggle={toggle}>
                    {props.animal.name}
                </ModalHeader>
                <ModalBody>
                    <div className="animal__breed">
                        <label className="label--animal">Breed:</label> {props.animal.breed}
                    </div>
                    <div className="animal__location">
                        <label className="label--animal">Location:</label> {props.location.name}
                    </div>
                    <div className="animal__owner">
                        <label className="label--animal">Customer:</label> {props.customer.name}
                    </div>

                    <button animalId={props.animal.id} onClick={toggleEdit} >Edit</button>
                    <Modal isOpen={editModal} toggleEdit={toggleEdit}>
                        <ModalHeader toggleEdit={toggleEdit}>
                            Update Animal
                        </ModalHeader>
                        <ModalBody>
                            <EditAnimalForm key={props.animal.id} animal={props.animal} customer={props.customer} location={props.location}toggleEdit={toggleEdit}></EditAnimalForm>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}