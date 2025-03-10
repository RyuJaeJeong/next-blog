'use client'
import Editor from '@/src/components/Editor'
import { useState } from "react";

const Write = () => {
    const [contents, setContents] = useState(null);
    const [title, setTitle] = useState(null);
    const handleChangeTitle =  (e) => {
        setTitle(e.target.value);
    }

    return(
        <div className={"w-4/5 md:w-3/5 h-[95VH] mx-auto px-2 py-10"}>
            <input type="text" name={"title"} onChange={(e)=>{ handleChangeTitle(e) }} placeholder={"제목을 입력해 주세요"} className={"w-full px-2 py-3 bg-transparent border border-[#CACACAFF] outline-0 text-lg mb-2"}/>
            <div className={"h-1/2 text-lg"}>
                <Editor contents={contents} setContents={setContents} className={"h-[90%]"} />
            </div>
            <div className={"w-full h-[3.5vh] mt-2 flex justify-end"}>
                <button onClick={(e)=>{ console.log(contents) }} className={"bg-black hidden md:inline px-2 py-1 w-[6rem] h-full text-white font-bold text-[1rem] rounded-md transition duration-300 hover:bg-gray-800 active:bg-gray-700"}>
                    제출하기
                </button>
            </div>
        </div>
    )
}

export default Write