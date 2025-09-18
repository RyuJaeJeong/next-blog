"use client"
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/component/loading"
import styles from "@/app/member/register/page.module.css"
import {zxcvbn, zxcvbnAsync, zxcvbnOptions} from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import { matcherPwnedFactory } from  '@zxcvbn-ts/matcher-pwned'

const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { register,handleSubmit, watch, formState: { isSubmitting, isSubmitted, errors }, getValues} = useForm();
    zxcvbnOptions.setOptions({
            translations: zxcvbnEnPackage.translations,
            graphs: zxcvbnCommonPackage.adjacencyGraphs,
            dictionary: {
                ...zxcvbnCommonPackage.dictionary,
                ...zxcvbnEnPackage.dictionary,
            },
    });
    const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
    zxcvbnOptions.addMatcher('pwned', matcherPwned)
    const [passwordStrengthScore, setPasswordStrengthScore] = useState(4);
    const [passwordStrengthFeedback, setPasswordStrengthFeedback] = useState("");
    const onSubmit = async data => {
        setIsLoading(true)
        fetch(`/api/member`, {
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(async res=>{
                const data = await res.json()
                if(!res.ok){
                    throw new Error(`${data.msg}`)
                }else{
                    console.log(res.status)
                    return data
                }
            }).then(res=>{
            setIsLoading(false);
            router.push(`/member/login?message=${res.msg}`)
        }).catch(error=>{
            setIsLoading(false);
            toast.error(error.message)
        })
    }

    const doVerification = async (e)=>{
        e.target.disabled = true;
        try{
            const email = getValues('email');
            if(!email) {
                e.target.disabled = false;
                return toast.warning("email 주소를 입력 하세요");
            }else if(!/\S+@\S+\.\S+/.test(email)){
                e.target.disabled = false;
                return toast.warning("이메일 형식에 맞지 않습니다.");
            }
            const res = await fetch(`/api/member/email/verification?email=${email}`);
            const payload = await res.json();
            console.log(payload);
        }catch (e) {
            e.target.disabled = false;
            return toast.error(e);
        }
    }

    return (
        <form id="registerForm" className={`text-end`} onSubmit={handleSubmit(onSubmit)}>
            <Loading className={`${isLoading ? "" : "d-none"}`}/>
            <ToastContainer position={"bottom-center"} pauseOnHover={false} autoClose={1500} theme={"colored"}/>
            <div className="form-floating">
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${errors.name && "is-invalid"}`}
                    placeholder="Enter your name..."
                    aria-invalid={
                        isSubmitted ? (errors.name ? "true" : "false") : undefined
                    }
                    {...register("name", {
                        required: "이름은 필수 입력입니다.",
                        pattern: {
                            value: /[가-힣]/,
                            message: "이름은 한글만 가능합니다."
                        },
                        minLength: {
                            value: 2,
                            message: "이름은 두자 이상 입력해 주세요"
                        }
                    })}
                />
                <label htmlFor="name">Name</label> {errors.name && <div id="emailHelp" role={"alert"} className={`form-text text-danger ${styles.errMessage}`}>{errors.name.message}</div>}
            </div>
            <div className="form-floating">
                <input
                    type="email"
                    id="email"
                    name={"email"}
                    className={`form-control ${!errors.name && errors.email && "is-invalid"}`}
                    aria-invalid={
                        isSubmitted ? (errors.email ? "true" : "false") : undefined
                    }
                    placeholder="Enter your email..."
                    {...register("email", {
                        required: "이메일은 필수 입력입니다.",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "이메일 형식에 맞지 않습니다.",
                        },
                    })}/>
                <label htmlFor="email">Email address</label>
                {!errors.name && errors.email && <div id="emailHelp" role={"alert"} className={`form-text text-danger ${styles.errMessage}`}>{errors.email.message}</div>}
            </div>
            <div className="row">
                <div className="col-8 col-md-10 pe-0">
                    <div className="form-floating">
                        <input
                            type="text"
                            id="verificationCode"
                            name="verificationCode"
                            className={`form-control ${!errors.name && !errors.email && errors.verificationCode && "is-invalid"}`}
                            aria-invalid={
                                isSubmitted ? (errors.verificationCode ? "true" : "false") : undefined
                            }
                            placeholder="Enter your verification code"
                            {...register("verificationCode", {
                                required: "이메일 인증을 진행 하세요",
                                minLength: {
                                    value: 6,
                                    message: "6자리 코드를 입력하세요.",
                                },
                                pattern: {
                                    value: /[0-9]/,
                                    message: "인증번호 형식에 맞지 않습니다.",
                                },
                            })}/>
                        <label htmlFor="verificationCode">Verification Code</label>
                        {!errors.name && !errors.email && errors.verificationCode && <div id="verificationCodeHelp" role={"alert"} className={`form-text text-danger ${styles.errMessage}`}>{errors.verificationCode.message}</div>}
                    </div>
                </div>
                <div className="col-4 col-md-2 d-flex align-items-end justify-content-end">
                    <button type="button" className="btn btn-outline-primary px-3" id="btnVerify" onClick={(e)=>{
                        doVerification(e)
                    }}>
                        가입하기
                    </button>
                </div>
            </div>
            <div className="form-floating">
                <input type="password"
                       id="password"
                       name={"password"}
                       className={`form-control ${!errors.name && !errors.email && !errors.verificationCode && errors.password && "is-invalid"}`}
                       aria-invalid={
                           isSubmitted ? (errors.password ? "true" : "false") : undefined
                       }
                       placeholder="Enter your password..."
                       {...register("password", {
                           required: "비밀번호는 필수 입력입니다.",
                           minLength: {
                               value: 8,
                               message: "8자리 이상 비밀번호를 사용하세요.",
                           },
                           maxLength: {
                               value: 64,
                               message: "64자리 이하 비밀번호를 사용하세요.",
                           },
                           onChange: (e) => {
                               zxcvbnAsync(e.target.value).then(result => {
                                   const feedback = result.feedback.warning || result.feedback.suggestions[0] || "";
                                   setPasswordStrengthScore(result.score);
                                   setPasswordStrengthFeedback(feedback);
                               });
                           }
                       })} />
                <label htmlFor="password">password</label>
                {!errors.name && !errors.email && !errors.verificationCode && errors.password && <div id="passHelp" role={"alert"} className={`form-text text-danger ${styles.errMessage}`}>{errors.password.message}</div>}
                {!errors.name && !errors.email && !errors.verificationCode && !errors.password && (passwordStrengthScore < 3) &&
                    <div id="passHelp2" role="alert" className={`form-text ${0 <= passwordStrengthScore && passwordStrengthScore <= 1 ? "text-danger" : (passwordStrengthScore == 2 ? "text-warning" : "")} ${styles.errMessage}`}>
                        {passwordStrengthFeedback}
                    </div>
                }
            </div>
            <div className="form-floating mb-3">
                <input type="password"
                       id="passwordCheck"
                       name={"passwordCheck"}
                       className={`form-control ${!errors.name && !errors.email && !errors.verificationCode && !errors.password && errors.passwordCheck && "is-invalid"}`}
                       aria-invalid={
                           isSubmitted ? (errors.passwordCheck ? "true" : "false") : undefined
                       }
                       placeholder="Enter your password..."
                       {...register("passwordCheck", {
                           required: "비밀번호 확인은 필수 입력입니다.",
                           minLength: {
                               value: 8,
                               message: "8자리 이상 비밀번호를 사용하세요.",
                           },
                           maxLength: {
                               value: 64,
                               message: "64자리 이하 비밀번호를 사용하세요.",
                           },
                           validate: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다."
                       })}
                />
                <label htmlFor="passwordCheck">confirm password</label>
                {!errors.name && !errors.email && !errors.verificationCode && !errors.password && errors.passwordCheck && <div id="passHelp" role={"alert"} className={`form-text text-danger ${styles.errMessage}`}>{errors.passwordCheck.message}</div>}
            </div>
            <button type="submit" className="btn btn-primary" id="submitButton" disabled={isSubmitting}>
                가입하기
            </button>
        </form>
    )
}

export default Form
