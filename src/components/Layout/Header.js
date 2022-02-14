import React from "react";

import mealImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
