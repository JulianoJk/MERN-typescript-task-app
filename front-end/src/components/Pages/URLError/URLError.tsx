import React from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { Button } from "../../Button/Button.component";
import styles from "./URLError.module.css";
import stop_sign from "../../../images/stop_sign.png";

interface IPops {
  bodyText?: string;
  navText?: string;
  statusNumber?: number;
  btnText?: string;
  navigationPath?: string;
}
const URLError: React.FC<IPops> = ({
  bodyText: text,
  statusNumber,
  navText,
  btnText,
  navigationPath,
}) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div>
      <header>
        <nav
          className={`navbar navbar-nav  ${styles.nav_bg} ${styles.errorMessage}`}
        >
          <div className="d-flex flex-row-reverse bd-highlight space ms-auto">
            <h1>{navText}</h1>
          </div>
        </nav>
      </header>
      <div className={`${styles.position}`}>
        <div className={` ${styles.border}`}>
          <div className="text-center">
            <img
              src={stop_sign}
              alt={"stop_sign"}
              className="rounded mx-auto d-block"
            />
          </div>
          <span
            className={`display-1 ${styles.errorMessage} ${styles.position}`}
          >
            <strong>{statusNumber}</strong>
          </span>
          <h2
            className={` display-4  ${styles.errorMessage} ${styles.position}`}
          >
            <em>{text}</em>
          </h2>
          {/* Clicking the button, will navigate user to index */}
          <Button
            className={` col-md-12 text-center btn-info`}
            text={btnText}
            onClick={() => navigate(`${navigationPath}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default URLError;
