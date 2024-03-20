import css from "classnames";
import React from "react";
import { useState } from "react";

import {
  StyledUl
} from "./Alert.styles";

const Alert = ({ children, type, message, show, closeAll, ...props }: any) => {
    //const [isShow, setIsShow] = useState(true);


    const renderElAlert = function () {
      return React.cloneElement(children);
    };

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      //setIsShow(false);
      closeAll()
    };
    
    return (
      <StyledUl
        className="fab-container"
      >
    <div className={show?type:"hide"}
    
    >
        <span className="closebtn" onClick={handleClose}>
            &times;
        </span>
        {children ? renderElAlert() : message}
    </div></StyledUl>
    );
}

export default Alert;