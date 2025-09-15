"use client"
import * as React from 'react'
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "@/component/loading"
import styles from "@/app/member/login/page.module.css";
import Image from "next/image";

const Form = (props)=>{
    const router = useRouter();
    const { register,handleSubmit, formState: { isSubmitting, isSubmitted, errors }} = useForm();
    const { message, error } = React.use(props.searchParams)
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data)=>{
        setIsLoading(true)
        data.redirect = false;
        const res = await signIn("credentials", data);
        if (res.status == 200) {
            redirect("/")
        } else if (res.status == 401) {
            setIsLoading(false);
            const msg = (res.error == 'CredentialsSignin') ? "Invalid email or Password!" : res.error;
            toast.error(msg);
        }
    }
    useEffect(()=>{
        if(message){
            toast.success(message)
            setTimeout(() => {
                router.replace('/member/login', { scroll: false });
            }, 200)
        }else if(error){
            if(error == 'OAuthAccountNotLinked'){
                toast.error("already exist email")
            }else{
                toast.error(error)
            }
            setTimeout(() => {
                router.replace('/member/login', { scroll: false });
            }, 200)
        }
    }, [])

    return (
        <form className={`${styles.loginBox} mx-auto shadow p-3 bg-body-tertiary rounded`}
              onSubmit={handleSubmit(onSubmit)}>
            <Loading className={`${isLoading ? "" : "d-none"}`}/>
            <ToastContainer position={"bottom-center"} pauseOnHover={false} autoClose={1500} theme={"colored"}/>
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
                {errors.email && <div id="emailHelp" role={"alert"}
                                      className={`form-text  text-danger ${styles.errMessage}`}>{errors.email.message}</div>}
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
            <div className={`text-center`}>
                <button type="button"
                        className={"flex items-center justify-center gap-2 w-full h-10 rounded-circle border bg-white hover:bg-gray-100"}
                        style={{width: "50px", height: "50px", color: "#f3f3f3"}}
                        onClick={() => signIn("google", {callbackUrl: "/"})}>
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#EA4335"
                              d="M9 3.48c1.69 0 2.84.73 3.49 1.35l2.38-2.32C13.57.89 11.5 0 9 0 5.48 0 2.44 1.98.96 4.88l2.86 2.22C4.4 5.04 6.52 3.48 9 3.48z"/>
                        <path fill="#4285F4"
                              d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84 a4.14 4.14 0 0 1-1.8 2.71l2.74 2.13c1.6-1.48 2.86-3.67 2.86-6.48z"/>
                        <path fill="#FBBC05"
                              d="M3.82 10.08A5.52 5.52 0 0 1 3.52 9c0-.38.07-.75.16-1.08 L.82 5.7A9 9 0 0 0 0 9c0 1.45.35 2.81.96 4.02l2.86-2.22z"/>
                        <path fill="#34A853"
                              d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.74-2.13 c-.76.51-1.73.86-3.22.86-2.48 0-4.6-1.56-5.18-3.72L.96 13.02C2.44 16.02 5.48 18 9 18z"/>
                    </svg>
                </button>
                &nbsp;
                <Link href={"#"} onClick={()=> signIn("naver", {callbackUrl: "/"})}>
                    <Image width={50} height={50} src="/btnW_icon_circle.png" alt={"Naver Login Button"}/>
                </Link>
            </div>

            <div className="form-text fs-6 text-center">
                Don't have an account yet?&nbsp;
                <Link style={{color: 'var(--bs-blue)'}} href={"/member/register"}>Register now</Link>
            </div>
        </form>
    )
}
export default Form