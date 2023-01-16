interface Props {
    border: string;
    color: string;
    children?: React.ReactNode;
    height: string;
    onClick: () => void;
    radius: string
    width: string;
    margin: string;
}

const ButtonWithCSS: React.FC<Props> = ({
                                     border,
                                     color,
                                     children,
                                     height,
                                     onClick,
                                     radius,
                                     width,
                                     margin,
                                 }) => {
    return (
        <button
            id={"advanced"}
            onClick={onClick}
            style={{
                backgroundColor: color,
                border,
                borderRadius: radius,
                height,
                width,
                margin
            }}
        >
            {children}
        </button>
    );
}

export default ButtonWithCSS;