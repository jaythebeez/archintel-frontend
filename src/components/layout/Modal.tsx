import React, {ReactNode, useEffect} from 'react'

type Props = {
    closeFunction?: Function
    children: ReactNode
    title?: string
}

const Modal = ({closeFunction, children, title}: Props) => {
    const closeModal = () => {
        if (closeFunction) {
            closeFunction();
        }
    }

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto"
        }
    },[])

    return (
        <div className="modal">
            <div className="modal-container" onClick={closeModal}>
                <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                    <div className="modal-header">
                        <h3>{title}</h3>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal