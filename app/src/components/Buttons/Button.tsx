import "./Button.css";

type ButtonTypes = "image" | "icon" | "connect" | "danger" | "default" | "primary" | "theme" | "round";

export type ButtonProps = {
    children?: React.ReactNode;
    image?: string;
    onClick: () => void;
    type: ButtonTypes;
    id?: string;
}

const Button = ({children, image, onClick, type, id}: ButtonProps) => {
    switch (type) {
        case "image":
            return <button className="image" id={id}><img src={image} alt="my image" onClick={onClick}/></button>;
        default:
            return (
                <button className={`${type}`}
                        id={id}
                        onClick={onClick}
                >{children}</button>
            );
    }
}

export default Button;