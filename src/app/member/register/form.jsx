"use client"
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import { HelpMessageDanger, HelpMessageSuccess, HelpMessage } from '@/component/helpMessage'
import Loading from "@/component/loading"
import { zxcvbnAsync, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import { matcherPwnedFactory } from  '@zxcvbn-ts/matcher-pwned'


zxcvbnOptions.setOptions({
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
    },
});
const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
zxcvbnOptions.addMatcher('pwned', matcherPwned);

const Form = () => {
    const router = useRouter();
    const { register,handleSubmit, watch, formState: { isSubmitting, isSubmitted, errors }, getValues} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrengthScore, setPasswordStrengthScore] = useState(4);
    const [passwordStrengthFeedback, setPasswordStrengthFeedback] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [expires, setExpires] = useState(null);
    const [diff, setDiff] = useState(0);
    const [expiresText, setExpiresText] = useState("");

    useEffect(()=>{
        if(diff > 0){
            setTimeout(()=>{
                setDiff(expires - new Date());
                setExpiresText(diffToText(diff));
            }, 1000);
        }else if(diff <= 0){
            setVerifying(false);
        }
    }, [diff]);

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
            if(!res.ok) throw new Error(payload.msg)
            setExpires(new Date(payload.data.expires));
            setDiff(new Date(payload.data.expires) - new Date());
            setVerifying(true);
            e.target.disabled = false;
        }catch (error) {
            console.log(error);
            e.target.disabled = false;
            return toast.error(error.message);
        }
    }

    const diffToText = (diff)=>{
        const oneSec = 1000
        const oneMinute = 1000 * 60
        const minute = (Math.floor(diff / oneMinute) + "").padStart(2, "0")
        const sec = (Math.floor((diff - (minute * oneMinute))/oneSec) + "").padStart(2, "0")
        return `${minute}:${sec}`
    }

    const doSubmit = async data => {
        setIsLoading(true)
        fetch(`/api/member`, {
            method: 'post',
            body: JSON.stringify(data)
        }).then(async res=>{
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

    const checkCondition = (name) => {
        switch (name) {
            case "name":
                return errors.name ;
            case "email":
                return !errors.name && errors.email;
            case "verificationCode":
                return !errors.name && !errors.email && !verifying && errors.verificationCode;
            case "password":
                return !errors.name && !errors.email && !errors.verificationCode && errors.password;
            case "password2":
                return !errors.name && !errors.email && !errors.verificationCode && !errors.password && (passwordStrengthScore < 3);
            case "passwordCheck":
                return !errors.name && !errors.email && !errors.verificationCode && !errors.password && errors.passwordCheck;
        }
    }

    return (
        <form id="registerForm" className={`text-end`} onSubmit={handleSubmit(doSubmit)}>
            <Loading className={`${isLoading ? "" : "d-none"}`}/>
            <ToastContainer position={"bottom-center"} pauseOnHover={false} autoClose={1500} theme={"colored"}/>
            <div className="form-floating">
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${checkCondition("name") && "is-invalid"}`}
                    placeholder="Enter your name..."
                    aria-invalid={
                        isSubmitted ? (errors.name ? "true" : "false") : undefined
                    }
                    {...register("name", {
                        required: "이름은 필수 입력입니다.",
                        minLength: {
                          value: 2,
                          message: "이름은 2글자 이상입니다."
                        },
                        pattern: {
                            value: /^[가-힣]{2,}$/,
                            message: "이름은 한글만 가능합니다."
                        }
                    })}
                />
                <label htmlFor="name">Name</label>
                {checkCondition("name") && <HelpMessageDanger message={errors.name.message} />}
            </div>
            <div className="form-floating">
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${checkCondition("email") && "is-invalid"}`}
                    aria-invalid={
                        isSubmitted ? (errors.email ? "true" : "false") : undefined
                    }
                    placeholder="Enter your email..."
                    {...register("email", {
                        required: "이메일은 필수 입력입니다.",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "유효한 이메일 형식이 아닙니다."
                        }
                    })}/>
                <label htmlFor="email">Email address</label>
                {checkCondition("email") && <HelpMessageDanger message={errors.name.message} />}
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
                                required: "인증코드는 필수입력입니다.",
                                pattern: {
                                    value: /^[0-9]{6}$/,
                                    message: "인증코드 형식에 맞지않습니다.",
                                }
                            })}/>
                        <label htmlFor="verificationCode">Verification Code</label>
                    </div>
                </div>
                <div className="col-4 col-md-2 d-flex align-items-end justify-content-end">
                    <button type="button"
                            id="btnVerify"
                            className="btn btn-outline-primary px-3"
                            onClick={async (e)=>{
                                await doVerification(e)
                            }
                    }>
                        인증하기
                    </button>
                </div>
            </div>
            <div className={"row text-start"}>
                {verifying && <HelpMessageSuccess message={expiresText} />}
                {checkCondition("verificationCode") && <HelpMessageDanger message={errors.verificationCode.message} />}
            </div>
            <div className="form-floating" >
                <input type="password"
                       id="password"
                       name="password"
                       className={`form-control ${checkCondition("password") && "is-invalid"}`}
                       aria-invalid={ isSubmitted ? (errors.password ? "true" : "false") : undefined }
                       placeholder="Enter your password..."
                       {...register("password", {
                           required: "비밀번호는 필수 입력입니다.",
                           minLength: {
                               value: 8,
                               message: "이름은 8글자 이상입니다."
                           },
                           maxLength: {
                               value: 64,
                               message: "이름은 64글자 이하입니다."
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
                {checkCondition("password") && <HelpMessageDanger message={errors.password.message} />}
                {checkCondition("password2") &&
                    <HelpMessage
                        message={passwordStrengthFeedback}
                        textColor={`${0 <= passwordStrengthScore && passwordStrengthScore <= 1 ? "text-danger" : (passwordStrengthScore == 2 ? "text-warning" : "")}`}
                    />
                }
            </div>
            <div className="form-floating mb-3">
                <input type="password"
                       id="passwordCheck"
                       name="passwordCheck"
                       className={`form-control ${checkCondition("passwordCheck") && "is-invalid"}`}
                       aria-invalid={
                           isSubmitted ? (errors.passwordCheck ? "true" : "false") : undefined
                       }
                       placeholder="Enter your password..."
                       {...register("passwordCheck", {
                           required: "비밀번호 확인은 필수 입력입니다.",
                           minLength: {
                               value: 8,
                               message: "이름은 8글자 이상입니다."
                           },
                           maxLength: {
                               value: 64,
                               message: "이름은 64글자 이하입니다."
                           },
                           validate: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다."
                        })
                       }
                />
                <label htmlFor="passwordCheck">confirm password</label>
                {checkCondition("passwordCheck") && <HelpMessageDanger message={errors.passwordCheck.message} />}
            </div>
            <button type="submit" className="btn btn-primary" id="submitButton" disabled={isSubmitting}>
                가입하기
            </button>
        </form>
    )
}

export default Form
