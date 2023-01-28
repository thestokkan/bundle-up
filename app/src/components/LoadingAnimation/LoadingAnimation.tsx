import './LoadingAnimation.css';

type LoadingProps = {
    text?: string;
    subText?: string;
}

const LoadingAnimation = ({text, subText}: LoadingProps) => {
    return (
        <div className="loading-animation">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
            <div className={"loading-text"}>
                {text && <p id={"text"}>{text}</p> || <p>Loading...</p>}
                {subText && <p id={"subtext"}>{subText}</p>}
            </div>
        </div>
    );
};

export default LoadingAnimation;