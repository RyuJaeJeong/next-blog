import Header from '@/component/header'
import Viewer from "@/component/tiptap/viewer";
import Link from "next/link";
import { notFound } from 'next/navigation';
import * as React from "react";
// import Image from 'next/image'

const Article = async (props) => {
    const params = await props.params;
    const { articleDt, articleSeq } = params;
    const articleResponse = await fetch(`${process.env.API_URL}/api/article/${articleDt}/${articleSeq}`);
    const articlePayload = await articleResponse.json();
    if(articlePayload.code == 404) notFound();
    const { articleTitle, articleContent, inpNm, inpDttm } = articlePayload.data
    return(
        <>
            <Header image={"/post-bg.webp"} head={articleTitle} subhead={"Problems look mighty small from 150 miles up"} meta={`${inpDttm}, ${inpNm}에 의해 작성됨`} isPost={true}/>
            <div className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className={"col-md-10 col-lg-8 col-xl-7"} style={{minHeight: "300px"}}>
                            <Viewer content={articleContent} />
                            <div className="w-100">
                                <Link href={"/article"} className="btn btn-primary text-uppercase">
                                    <i className="fa-solid fa-arrow-left-long"></i> List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Article