import BtnDelete from "@/src/app/detail/[id]/BtnDelete";
import BtnGoModifyForm from "@/src/app/detail/[id]/BtnGoModifyForm";
import BtnGoList from "@/src/app/detail/[id]/BtnGoList";
import Modal from '@/src/components/Modal'
import {notFound} from "next/navigation";

const Detail = async (props) => {
    const params = await props.params
    const id = params.id
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const result = await fetch(`${API_URL}/api/articles/${id}`);
    const data = await result.json();
    if(data.data.length <= 0) return notFound()


    return(
        <article className={"w-4/5 md:w-3/5 min-h-[95VH] h-auto mx-auto px-2 py-10 prose max-w-none"}>
            <Modal modalHeader={"ERROR"} modalContents={"정말 삭제 하시겠습니까?"} btnText={ "삭제하기" } btnFunction={ null } isClose={ false }/>
            <div className={"w-full h-auto my-5"}>
                <h1 className={"mb-0"}>
                    { data.data[0].title }
                </h1>
                <p className={"text-md"}>
                    류재정, { data.data[0].updDttm }
                </p>
            </div>
            <div className={"w-full h-auto my-5 text-xl contents-area"} dangerouslySetInnerHTML={{ __html: data.data[0].contents}}></div>
            <div className={"w-full h-auto my-3 items-end flex justify-between"}>
                <div>
                    <BtnGoModifyForm id={id} />
                    <BtnDelete className={"ms-2 text-white"} id={id} />
                </div>
                <div>
                    <BtnGoList className={""} />
                </div>

            </div>
        </article>
    )
}

export default Detail