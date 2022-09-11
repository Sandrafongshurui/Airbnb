import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
// import { StyledModal } from "./style";
import "./Modal.css";

// Creates a portal outside the DOM hierarchy
const Portal = ({ children }) => {
  //get only index 0 of useState
   // A div with id=modal-root in the index.html
  const [modalRoot] = useState(document.getElementById("modal-root"))  
    // Create a div element which will be mounted within modal-root
  const [element] = useState(document.createElement("div"))
 
  console.log("open portal")
  // const modalRoot = document.getElementById("modal-root");
 
  //const element = document.createElement("div");

      // //cleanup method to remove the appended child
      // const cleanUp = () => {
      //   modalRoot.removeChild(element);
      // }

  //when it gets created, append the modal to it
  //subsequent render of portal  wont use effect cos of the element and modalRoot is not set
  useEffect(() => {
    console.log("use effect, mounting")
    modalRoot.appendChild(element);
    return function cleanup() {
      modalRoot.removeChild(element);
    };
  },[element, modalRoot]);

  //creates the modal/portal, 1st param modal content, is 2nnd param is a dom element
  return createPortal(children, element);
};

// A modal component which will be used by other components / pages
const Modal = ({ children, toggle, open }) => {
  return (
    <Portal>
      {open && (
       
        <div className="ModalWrapper" >
          <div
            className="ModalBody"
            onClick={(event) => event.stopPropagation()}
          > 
           {/* on click will send the toggle value to parent(login) */}
            <button className="CloseButton" onClick={toggle}>
              &times;
            </button>
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};

export default Modal;
