import { signIn } from "@/auth"
import Header from "@/component/header";

export default function SignIn() {
    return (
        <>
            <Header image={"/login-bg.jpg"} head={"Login Page"} subhead={"A Blog by Next.js"} meta={""} isPost={false}/>
            <form
                action={async (formData) => {
                    "use server"
                    formData.append("redirectTo", "/")
                    await signIn("credentials", formData)
                }}
                className={"w-25 mx-auto shadow p-3 bg-body-tertiary rounded"}
                style={{marginBottom: "4rem"}}
            >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" name={"email"} aria-describedby="emailHelp"/>
                    {/*<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>*/}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name={"password"} id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button className="btn btn-dark w-100 rounded">Submit</button>
            </form>
        </>

    )
}