import BtnGoList from "@/src/app/list/BtnGoWrite";
import Pager from "@/src/app/list/pager";

export default async function List(props) {
    const API_URL = process.env.API_URL
    const params = await props.searchParams;
    const pageNo = parseInt(params.pageNo || "1", 10);
    let list = []
    let pageData = null;
    try{
        const url = `${API_URL}/api/articles?pageNo=${pageNo}`
        const response = await fetch(url);
        const body = await response.json();
        list = body.data;
        pageData = body.pageData;
    }catch (e) {
        console.error("에러 입니다", e)
    }

    return (
        <div className={"w-full h-full"}>
            <div className={"flex justify-between prose max-w-none w-full h-[8%] "}>
                <div className={"w-auto h-full flex items-center"}>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=list"/>
                    <span className="material-symbols-outlined">
                      list
                    </span>
                    <h3 className={"my-0"}>
                        &nbsp;목록
                    </h3>
                </div>
                <div className={"w-auto h-full flex items-center"}>
                    <BtnGoList/>
                </div>
            </div>
            <div className={"w-full h-auto mb-5"}>
                <div className="overflow-x-auto">
                    <table className="table block my-auto ">
                        <thead>
                            <tr>
                                <th width={"10%"}></th>
                                <th width={"50%"} className={"text-center"}>제목</th>
                                <th width={"20%"} className={"text-center"}>입력일자</th>
                                <th width={"20%"} className={"text-center"}>수정일자</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            list.map((data)=> (
                                <tr key={data.id} className="hover:bg-base-300 cursor-pointer">
                                    <th>{data.id}</th>
                                    <td>{data.title}</td>
                                    <td className={"text-center"}>{data.inpDttm}</td>
                                    <td className={"text-center"}>{data.updDttm}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <Pager pageData={pageData} currentPageNo={pageNo} />
        </div>
    );
}