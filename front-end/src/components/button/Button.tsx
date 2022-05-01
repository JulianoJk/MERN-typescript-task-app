import styles from "./Button.module.css";
interface IButtonProps {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
// Pass the text the button will have and the onClick event
export const Button: React.FC<IButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button
      className={`btn btn-success space flex-wrap  ${className} ${styles.btn_font}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
