'use client'

const Modal = (props) => {
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold">{ props.modalHeader }</h3>
                <p className="py-4"> { props.modalContents } </p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-neutral mx-2" onClick={()=>{props.btnFunction()}}>
                            { props.btnText }
                        </button>
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal