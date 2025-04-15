'use client'
import Editor from '@/src/components/Editor'
import Modal from '@/src/components/Modal'
import { useState } from "react";

const Write = () => {
    const [contents, setContents] = useState(null);
    const [title, setTitle] = useState(null);
    const [modalHeader, setmodalHeader] = useState(null);
    const [modalContents, setModalContents] = useState(null);
    const [btnText, setBtnText] = useState(null);
    const [btnFunction, setBtnFunction] = useState(null);


    const handleChangeTitle =  (e) => {
        setTitle(e.target.value);
    }

    const submit = async () => {
        setmodalHeader("Are U SURE?")
        setModalContents("정말 제출 하시겠습니까?")
        setBtnText("제출하기")


        const submitForm = async () => {
             const data = {
                 title : title,
                 contents : contents
             }

             try{
                 const result = await fetch('/api/articles', {
                     method:'POST',
                     body: JSON.stringify(data)
                 });
                 const resultData = await result.json();
                 if(resultData.code === 1) location.href="/"
             }catch (e) {
                 console.error(e.message)
             }
        }

        setBtnFunction(() => submitForm)
        my_modal_1.showModal()
    }



    return(
        <div className={"w-4/5 md:w-3/5 h-[95VH] mx-auto px-2 py-10"}>
            <Modal modalHeader={modalHeader} modalContents={modalContents} btnText={ btnText } btnFunction={ btnFunction }/>
            <input type="text" name={"title"} onChange={(e)=>{ handleChangeTitle(e) }} placeholder={"제목을 입력해 주세요"} className={"w-full px-2 py-3 bg-transparent border border-[#CACACAFF] outline-0 text-lg mb-2"}/>
            <div className={"h-1/2 text-lg"}>
                <Editor contents={contents} setContents={setContents} className={"h-[90%]"} />
            </div>
            <div className={"w-full h-[3.5vh] mt-2 flex justify-end"}>
                <button className="btn btn-neutral mx-2" onClick={(e)=>{ submit() }} >
                    제출하기
                </button>
            </div>
        </div>
    )
}

export default Write