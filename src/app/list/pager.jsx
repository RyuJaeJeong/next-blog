'use client'
import { useRouter } from 'next/navigation'

const Pager = (props)=> {
    const pageData = props.pageData;
    const currentPageNo = parseInt(props.currentPageNo, 10)
    const pageList = Array.from({length: pageData.lastPage - pageData.startPage + 1},
        (e, i) => i+ pageData.startPage
    );
    const router = useRouter()
    const goPage = (pageNo)=>{
        router.push(`/list?pageNo=${pageNo}`)
    }
    return (
        <div className={"flex items-center justify-center w-full h-[8%] "}>
            <div className="join">
                <button className={`join-item btn ${(pageData.startPage > pageData.blockSize)?"":"hidden"}`}
                        onClick={()=>{
                            goPage(pageData.startPage - pageData.blockSize)
                        }}>
                    «
                </button>
                {
                    pageList.map((pageNo) => (
                        <button key={pageNo}
                                className={`join-item btn ${(pageNo === currentPageNo ? "btn-active" : "")}`}
                                onClick={() => {
                                    goPage(pageNo)
                                }}>
                            {pageNo}
                        </button>
                    ))
                }
                <button className={`join-item btn ${(pageData.lastPage < pageData.totalPage)?"":"hidden"}`}
                        onClick={()=>{
                            goPage(pageData.startPage + pageData.blockSize)
                        }}>
                    »
                </button>
            </div>
        </div>
    )
}

export default Pager