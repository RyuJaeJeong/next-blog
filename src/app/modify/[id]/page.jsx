'use client'

import Editor from '@/src/components/Editor'
import Modal from '@/src/components/Modal'
import BtnGoList from "@/src/app/modify/[id]/BtnGoList";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Modify = () => {
    const params = useParams();
    const [id, setId] = useState(params.id);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState(null);
    const [modalHeader, setmodalHeader] = useState(null);
    const [modalContents, setModalContents] = useState(null);
    const [btnText, setBtnText] = useState(null);
    const [btnFunction, setBtnFunction] = useState(null);
    const [modalIsClose, setModalIsClose] = useState(true);
    const API_URL = process.env.API_URL

    useEffect(()=>{
        fetch(`${API_URL}/api/articles/${id}`).then(async (res)=>{
           const result = await res.json();
           const data = result.data;
           if(data.length == 0) throw new Error("게시물을 찾을 수 없습니다.");
           setTitle(data[0].title);
           setContents(data[0].contents);
        }).catch((e)=>{
            setmodalHeader("에러입니다.");
            setModalContents(e.message);
            setBtnText("뒤로가기");
            setModalIsClose(false);
            const goList = () => {
                location.href = "/"
            }
            setBtnFunction(() => goList);
            my_modal_1.showModal()
        })
    }, [])

    const handleChangeTitle =  (e) => {
        setTitle(e.target.value);
    }

    const submit = async () => {
        setmodalHeader("Are U SURE?")
        setModalContents("정말 수정 하시겠습니까?")
        setBtnText("수정하기")
        setModalIsClose(true);

        const submitForm = async () => {
            const data = {
                id : id,
                title : title,
                contents : contents
            }

            try{
                const result = await fetch(`${API_URL}/api/articles`, {
                    method:'PATCH',
                    body: JSON.stringify(data)
                });
                const resultData = await result.json();
                if(resultData.code === 1) location.href=`/detail/${id}`
            }catch (e) {
                console.error(e.message)
            }
        }

        setBtnFunction(() => submitForm)
        my_modal_1.showModal()
    }



    return(
        <div className={"w-4/5 md:w-3/5 h-[95VH] mx-auto px-2 py-10"}>
            <Modal modalHeader={modalHeader} modalContents={modalContents} btnText={ btnText } btnFunction={ btnFunction } isClose={ modalIsClose }/>
            <input type="text" name={"title"} value={title} onChange={(e)=>{ handleChangeTitle(e) }} placeholder={"제목을 입력해 주세요"} className={"w-full px-2 py-3 bg-transparent border border-[#CACACAFF] outline-0 text-lg mb-2"}/>
            <div className={"h-1/2 text-lg"}>
                <Editor contents={contents} setContents={setContents} className={"h-[90%]"} />
            </div>
            <div className={"w-full h-[3.5vh] mt-2 flex justify-end"}>
                <BtnGoList />
                <button className="btn btn-neutral mx-2" onClick={()=>{ submit() }} >
                    제출하기
                </button>
            </div>
        </div>
    )
}

export default Modify