'use client'

const Modal = (props) => {
    const isClose = props.isClose;
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="text-lg font-bold">{ props.modalHeader }</h3>
                <p className="py-4"> { props.modalContents } </p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className={`btn btn-neutral ${isClose?"mx-2":""}`} onClick={()=>{props.btnFunction()}}>
                            { props.btnText }
                        </button>
                        <button className={`btn ${isClose?"":"hidden"}`}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal