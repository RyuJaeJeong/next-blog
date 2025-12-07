import Header from '@/component/header'
import { notFound } from 'next/navigation';
// import Image from 'next/image'

const Article = async (props) => {
    const params = await props.params;
    const { articleDt, articleSeq } = params;
    const articleResponse = await fetch(`http://localhost:3000/api/article/${articleDt}/${articleSeq}`);
    const articlePayload = await articleResponse.json();
    if(articlePayload.code == 404) notFound();
    const { articleTitle, articleContent, inpNm, inpDttm } = articlePayload.data
    return(
        <>
            <Header image={"/post-bg.webp"}
                    head={articleTitle}
                    // subhead={"Problems look mighty small from 150 miles up"}
                    meta={`${inpDttm}, ${inpNm}에 의해 작성됨`}
                    isPost={true}/>
            <div className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div dangerouslySetInnerHTML={{ __html: articleContent }} className="col-md-10 col-lg-8 col-xl-7" style={{minHeight: '300px'}}>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Article