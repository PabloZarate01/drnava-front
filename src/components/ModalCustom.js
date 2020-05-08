import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalCustom = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <>
      <Button className="p-2 btn btn-primary btn-circle" color="danger" onClick={toggle}>{buttonLabel}<i class="fas fa-trash"></i></Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>ELIMINAR PACIENTE {props.name}</ModalHeader>
        <ModalBody>
          Estás apunto de eliminar al usuario {props.name} {props.lastName}.
          <p class="text-muted">{props.patId}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={() => props.deletePatient}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalCustom;