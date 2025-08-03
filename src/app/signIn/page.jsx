"use client"
import { signIn } from "next-auth/react"
import Header from "@/component/header";
import styles from "@/app/signIn/page.module.css"
import {redirect} from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';

export default function SignIn() {
    const handleSubmit = async (e) => {
        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')

        signIn("credentials", {email: email, password: password, redirect: false}).then((res)=>{
            if(res.status == 200){
                redirect("/")
            }else if(res.status == 401){
                toast.error("Invalid email or Password!")
            }
        });

    }
    return (
        <>
            <Header image={"/login-bg.jpg"} head={"Login Page"} subhead={"A Blog by Next.js"} meta={""} isPost={false}/>
            <ToastContainer position={"bottom-center"}pauseOnHover={false} />
            <form
                className={`${styles.loginBox} mx-auto shadow p-3 bg-body-tertiary rounded`}
                onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit(e);
                }}
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name={"email"} id={"email"} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name={"password"} id={"password"}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type={"submit"} className="btn btn-dark w-100 rounded">Submit</button>
            </form>
        </>

    )
}