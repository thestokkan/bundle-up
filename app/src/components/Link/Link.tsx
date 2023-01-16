import './Link.css';

interface Props {
    text: string;
    url: string;
}


const Link = ({text, url}: Props ) => {
    return <a href={url}>{text}</a>
};

export default Link;