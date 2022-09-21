import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

// Creates a portal outside the DOM hierarchy
const Portal = (props) => {
  //get only index 0 of useState
  // A div with id=modal-root in the index.html
  const [modalRoot] = useState(document.getElementById("modal-root"))  
  // Create a div element which will be mounted within modal-root
  const [element] = useState(document.createElement("div"))
  console.log("open portal")

  //only useEffect when element, modalRoot changes
  useEffect(() => {
    // console.log("use effect, for mounting")
    modalRoot.appendChild(element);

    //fires on dismount
    return function cleanup() {
      // console.log("unmount portal")
      modalRoot.removeChild(element);
    };
  },[element, modalRoot]);

  //creates the portal, 1st param modal content,
  //2nd param is a dom element the portal is created at
  //console.log(props.children)//children points to the elements inside Portal component
  return createPortal(props.children, element);
};

// A modal component which will be used by other components / pages just by changing the {children}
const Modal = (props) => {
 const  { children, open } = props
 //console.log(children)//children points to the elements inside Modal Component
  return (
    <Portal>
      {open && (      
        <div className="modal-wrapper" >
          <div className="login-modal-body"> 
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};

export default Modal;
