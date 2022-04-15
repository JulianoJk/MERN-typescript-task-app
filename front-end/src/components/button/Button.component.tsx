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
      className={`btn btn-success space flex-wrap  ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
