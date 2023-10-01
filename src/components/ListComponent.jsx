import React, { useState } from "react";
import "animate.css";

import {
  RiCircleLine,
  RiDeleteBin4Line,
  RiCircleFill,
  RiEditBoxLine,
} from "react-icons/ri";

const ListComponent = (props) => {
  const [anim, setanim] = useState("animate__fadeIn");
  return (
    <span className={`animate__animated ${anim}`}>
      <h3>
        <i onClick={props.status}>
          {props.statusRes == "true" ? <RiCircleFill /> : <RiCircleLine />}
        </i>
        <p
          style={{
            textDecoration: props.statusRes == "true" ? "line-through" : "none",
          }}
        >
          {props.listValue}
        </p>
      </h3>
      <h2>
        <i>
          <RiEditBoxLine onClick={props.editList}/>
        </i>
        <i>
          <RiDeleteBin4Line
            onClick={() => {
              props.deleteList();
              setanim("animate__shakeX");
            }}
          />
        </i>
      </h2>
    </span>
  );
};

export default ListComponent;
