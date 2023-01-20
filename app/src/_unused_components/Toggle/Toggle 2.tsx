import './Toggle.css';

type toggleProps = {
    checked: boolean;
    // onChange: (e) => onChange(e.target.checked);
}

const Toggle = () => {
    return (
        <label className="switch">
            <input type="checkbox"/>
                <span className="slider round"></span>
        </label>);
}

export default Toggle;