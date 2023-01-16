import './Button.css'

export type CounterProps = {
    onClick: () => void;
    text: string;
    type: "up" | "down";
}

const CounterButton = ({onClick, text, type}: CounterProps) => {
  return (
    <button className="counter" id={type} onClick={onClick}>{text}</button>
  );
}

export default CounterButton;