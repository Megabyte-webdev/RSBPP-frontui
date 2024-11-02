// import { useContext, useState } from "react";
// import { Button, Modal } from "react-bootstrap";
// import Widget from "../auth/Widget";
// import { UserContext } from "../../context/AuthContext";

// const NewDashboardWidget = () => {
//     const {widgetOpen, setWidgetOpen} = useContext(UserContext)

//     const handleClose = () => setWidgetOpen(false);
//     const handleShow = () => setWidgetOpen(true);

//     return (
//             <Modal
//                 show={widgetOpen}
//                 size="lg"
//                 backdrop="static"
//                 centered
//                 onHide={handleClose}>
//                 <Modal.Header closeButton className='bottom_brown'>
//                     <Modal.Title>Widget</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Widget handleClose={handleClose} />

//                 </Modal.Body>
               
//             </Modal>
//     )
// }
// export default NewDashboardWidget;