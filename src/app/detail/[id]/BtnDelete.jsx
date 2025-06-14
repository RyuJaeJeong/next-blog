'use client'
import Modal from '@/src/components/Modal'

const BtnDelete = (props)=>{
    const id = props.id;
    const className = props.className;
    const API_URL = process.env.API_URL
    const doDel = async () => {
        try{
            const result = await fetch(`${API_URL}/api/articles/${id}`, {
                method:'DELETE'
            });
            const data = await result.json();
            location.href="/"

        }catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Modal modalHeader={"ARE U SURE?"} modalContents={"정말 삭제 하시겠습니까?"} btnText={ "삭제하기" } btnFunction={ doDel } isClose={ true }/>
            <button className={`btn btn-error ${className}`} onClick={()=>{
            my_modal_1.showModal();
        }}>
            삭제하기
        </button>
        </>
    )
}

export default BtnDelete