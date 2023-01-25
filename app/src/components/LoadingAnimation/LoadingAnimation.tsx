import './LoadingAnimation.css';

type LoadingProps = {
    text?: string;
}

const LoadingAnimation = ({text}: LoadingProps) => {
    return (
        <div className="loading-animation">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
            <div className={"loading-text"}>
                {text && text || <p>Loading...</p>}
            </div>
        </div>
    );
};

export default LoadingAnimation;