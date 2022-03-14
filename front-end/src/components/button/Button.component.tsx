import React from "react";

interface IButtonProps {
  label?: string;
}

export const Button: React.FC<IButtonProps> = ({ label }) => {
  return <button>{label ?? "Simple Button"}</button>;
};
