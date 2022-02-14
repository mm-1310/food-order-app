import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* when we use spread operator with props.input obj property and values will be set automatically */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
