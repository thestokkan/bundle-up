import './LoadingAnimation.css';

type LoadingProps = {
    text?: string;
    timeoutText?: string;
}

const LoadingAnimation = ({text, timeoutText}: LoadingProps) => {
    return (
        <div className="loading-animation">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
            <div className={"loading-text"}>
                {text && text || <p>Loading...</p>}
                {timeoutText && <p>{timeoutText}</p>}
            </div>
        </div>
    );
};

export default LoadingAnimation;