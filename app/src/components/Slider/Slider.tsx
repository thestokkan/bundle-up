import './Slider.css'
import ReactSlider from "react-slider";

const Slider = () => {
    return (
        <ReactSlider
            className = "customSlider"
            trackClassName = "customSlider-track"
        />
    );
};

export default Slider;