import './Button.css';

export type CrossButtonProps = {
    onClick: () => void;
}

const CrossButton = ({onClick}: CrossButtonProps) => {
    return (
      <button className={"cross"} onClick={onClick}>X</button>
    );
}

export default CrossButton;