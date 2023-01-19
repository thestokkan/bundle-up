import './Component.css';

interface Props {
    prop1: string;
    prop2: number;
}


const Component = ({prop1, prop2}: Props) => {
    return (
        <div className="component">
            <p>{prop1}: {prop2}</p>
        </div>
    );
};

export default Component;