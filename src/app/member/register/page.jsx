import Header from '@/component/header'

const Register = ()=>{
    return(
        <>
            <Header image={"/login-bg.jpg"} head={"회원 가입"} subhead={""} meta={"Next.log()에 오신 것을 환영 합니다"} isPost={false}/>
            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div>
                                <form id="registerForm" action={"/api/member"} method={"post"}>
                                    <div className="form-floating">
                                        <input className="form-control" id="name" name={"name"} type="text" placeholder="Enter your name..." data-sb-validations="required"/>
                                        <label htmlFor="name">Name</label>
                                        <div className="invalid-feedback" data-sb-feedback="name:required">
                                            A name is required.
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" id="email" name={"email"} type="email" placeholder="Enter your email..." data-sb-validations="required,email"/>
                                        <label htmlFor="email">Email address</label>
                                        <div className="invalid-feedback" data-sb-feedback="email:required">
                                            An email is required.
                                        </div>
                                        <div className="invalid-feedback" data-sb-feedback="email:email">
                                            Email is not valid.
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" id="password" name={"password"} type="password" placeholder="Enter your password..." data-sb-validations="required"/>
                                        <label htmlFor="password">password</label>
                                        <div className="invalid-feedback" data-sb-feedback="password:required">
                                            A password number is required.
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <input className="form-control" id="passwordCheck" name={"passwordCheck"} type="password" placeholder="Enter your password..." data-sb-validations="required"/>
                                        <label htmlFor="passwordCheck">confirm password</label>
                                        <div className="invalid-feedback" data-sb-feedback="password:required">
                                            A password number is required.
                                        </div>
                                    </div>
                                    <br/>
                                    <button className="btn btn-primary text-uppercase" id="submitButton" type="submit">
                                        가입하기
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Register