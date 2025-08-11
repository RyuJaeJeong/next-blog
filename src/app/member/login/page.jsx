"use client"
export const dynamic = 'force-dynamic'
import Header from "@/component/header";
import styles from "@/app/member/login/page.module.css"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = ()=>{
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(()=>{
        const message = searchParams?.get("message");
        if(message){
            toast.success(message)
            setTimeout(() => {
                router.replace('/member/login', { scroll: false });
            }, 200)
        }
    }, [])
    const { register,handleSubmit, formState: { isSubmitting, isSubmitted, errors }} = useForm();
    return (
        <>
            <Header image={"/login-bg.jpg"} head={"Login Page"} subhead={"A Blog by Next.js"} meta={""} isPost={false}/>
            <ToastContainer position={"bottom-center"} pauseOnHover={false} autoClose={1500} theme={"colored"} />
            <form
                className={`${styles.loginBox} mx-auto shadow p-3 bg-body-tertiary rounded`}
                onSubmit={handleSubmit(async data => {
                        data.redirect = false;
                        signIn("credentials", data).then((res)=>{
                            if(res.status == 200){
                                redirect("/")
                            }else if(res.status == 401){
                                toast.error("Invalid email or Password!")
                            }
                        });
                    }
                )}
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email"
                           name={"email"}
                           id={"email"}
                           className="form-control"
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
                           })} />
                    {errors.email && <div id="emailHelp" role={"alert"} className="form-text fs-6 text-danger">{errors.email.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"
                           name={"password"}
                           id={"password"}
                           className="form-control"
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
                           })} />
                    {errors.password && <div id="passHelp" role={"alert"} className="form-text fs-6 text-danger">{errors.password.message}</div>}
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type={"submit"} className="btn btn-dark w-100 rounded mb-3" disabled={isSubmitting}>Submit</button>
                <div className="form-text fs-6 text-center">
                    Don't have an account yet? <Link style={{color: 'var(--bs-blue)'}} href={"/member/register"}>Register now</Link>
                </div>
            </form>
        </>
    )
}

export default Login