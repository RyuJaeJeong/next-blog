"use client"
import Header from "@/component/header";
import styles from "@/app/member/login/page.module.css"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import * as React from 'react'
import Loading from "@/component/loading"

const Login = ({searchParams})=>{
    const router = useRouter();
    const { message } = React.use(searchParams)
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        if(message){
            toast.success(message)
            setTimeout(() => {
                router.replace('/member/login', { scroll: false });
            }, 200)
        }
    }, [])
    const { register,handleSubmit, formState: { isSubmitting, isSubmitted, errors }} = useForm();
    return (
        <div className={"position-relative h-100"}>
            <Loading className={`${isLoading?"":"d-none"}`}/>
            <Header image={"/login-bg.jpg"} head={"Login Page"} subhead={"A Blog by Next.js"} meta={""} isPost={false}/>
            <ToastContainer position={"bottom-center"} pauseOnHover={false} autoClose={1500} theme={"colored"} />
            <form
                className={`${styles.loginBox} mx-auto shadow p-3 bg-body-tertiary rounded`}
                onSubmit={handleSubmit(async data => {
                        setIsLoading(true)
                        data.redirect = false;
                        const res = await signIn("credentials", data);
                        if(res.status == 200){
                            redirect("/")
                        }else if(res.status == 401){
                            setIsLoading(false);
                            const msg = (res.error == 'CredentialsSignin')?"Invalid email or Password!":res.error;
                            toast.error(msg);
                        }
                    }
                )}
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email"
                           name={"email"}
                           id={"email"}
                           className={`form-control ${errors.email && "is-invalid"}`}
                           aria-invalid={
                               isSubmitted ? (errors.email ? "true" : "false") : undefined
                           }
                           aria-describedby="emailHelp"
                           {...register("email", {
                               required: "이메일은 필수 입력입니다.",
                               pattern: {
                                   value: /\S+@\S+\.\S+/,
                                   message: "이메일 형식에 맞지 않습니다.",
                               },
                           })}/>
                    {errors.email && <div id="emailHelp" role={"alert"} className={`form-text  text-danger ${styles.errMessage}`}>{errors.email.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"
                           name={"password"}
                           id={"password"}
                           className={`form-control ${!errors.email && errors.password && "is-invalid"}`}
                           aria-invalid={
                               isSubmitted ? (errors.password ? "true" : "false") : undefined
                           }
                           aria-describedby="passHelp"
                           {...register("password", {
                               required: "비밀번호는 필수 입력입니다.",
                               minLength: {
                                   value: 8,
                                   message: "8자리 이상 비밀번호를 사용하세요.",
                               },
                               maxLength: {
                                   value: 64,
                                   message: "64자리 이하 비밀번호를 사용하세요."
                               }
                           })} />
                    {!errors.email && errors.password && <div id="passHelp" role={"alert"} className={`form-text  text-danger ${styles.errMessage}`}>{errors.password.message}</div>}
                </div>
                {/*<div className="mb-3 form-check">*/}
                {/*    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>*/}
                {/*    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>*/}
                {/*</div>*/}
                <button type={"submit"} className="btn btn-dark w-100 rounded mb-3" disabled={isSubmitting}>Submit</button>
                <div className="form-text fs-6 text-center">
                    Don't have an account yet? <Link style={{color: 'var(--bs-blue)'}} href={"/member/register"}>Register now</Link>
                </div>
            </form>
        </div>
    )
}

export default Login