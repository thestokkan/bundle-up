import {Button, ButtonProps, CrossButton } from '../Buttons';
import './Modal.css'

type ModalProps = {
    children: React.ReactNode;
    closeModal: () => void;
    isOpen: boolean;
    title?: string;
    buttons?: ButtonProps[];
    button?: boolean
};

const Modal = ({
                   children,
                   closeModal,
                   isOpen,
                   title,
                   buttons,
                   button=false
               }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-layout">
            <div className="modal-header">
                <h4>{title}</h4>
                <CrossButton onClick={closeModal}></CrossButton>
            </div>
            <div className="modal-body">{children}</div>

            {button? 
            <div className="btn-group">
                {buttons?.map((button, index) => {
                    return (
                        <div className="modal-btn" key={`btn-${index}`}>
                            <Button {...button} />
                        </div>
                    );
                })}
            </div>
               :
               null}
        </div>
    );
};

export default Modal;