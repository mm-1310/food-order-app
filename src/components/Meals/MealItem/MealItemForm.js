import React, { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";

import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [qtyIsValid, setQtyIsValid] = useState(true)
  const qtyInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredQty = qtyInputRef.current.value;
    const enteredQtyNumber = +enteredQty;

    if (
      enteredQty.trim().length === 0 ||
      enteredQtyNumber < 1 ||
      enteredQtyNumber > 5
    ) {
      setQtyIsValid(false)
      return;
    }

    props.onAddToCart(enteredQtyNumber);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={qtyInputRef}
        label="Qty"
        input={{
          id: "qty_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!qtyIsValid && <p>Please enter qty between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
