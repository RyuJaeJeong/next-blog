import Header from '@/component/header'
import Form from './form'

const Register = ()=>{
    return(
        <>
            <Header image={"/login-bg.webp"} head={"회원 가입"} subhead={""} meta={"Next.log()에 오신 것을 환영 합니다"} isPost={false}/>
            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div>
                                <Form />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Register