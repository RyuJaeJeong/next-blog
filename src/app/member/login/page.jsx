import Header from "@/component/header";
import Form from './form'

const Login = ({searchParams})=>{
    return (
        <div className={`position-relative min-h-100`}>
            <Header image={"/login-bg.webp"} head={"Login Page"} subhead={"A Blog by Next.js"} meta={""} isPost={false}/>
            <Form searchParams={searchParams}/>
        </div>
    )
}

export default Login