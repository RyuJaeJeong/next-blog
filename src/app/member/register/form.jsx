"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {toast, ToastContainer} from "react-toastify";

const Form = () => {
    const router = useRouter()
    const { register,handleSubmit, formState: { isSubmitting, isSubmitted, errors }} = useForm();
    return (
        <form id="registerForm"
              className={"text-end"}
              onSubmit={handleSubmit(async data =>{
                    fetch(`/api/member`, {
                        method: 'post',
                        body: JSON.stringify(data)
                    })
                    .then(res=>{
                        if(!res.ok){
                            throw new Error(`HTTP ${res.status} : ${res.statusText}`)
                        }else{
                            console.log(res.status)
                            return res.json()
                        }
                    })
                    .then(res=>{
                        router.push(`/member/login?message=${res.msg}`)
                    })
                    .catch(error=>{
                        console.error(error)
                        toast.error(error.message)
                    })
              })}
        >
            <ToastContainer position={"bottom-center"} pauseOnHover={false} autoClose={1500} theme={"colored"} />
            <div className="form-floating">
                <input
                    type="text"
                    id="name"
                    name={"name"}
                    className="form-control"
                    placeholder="Enter your name..."
                    aria-invalid={
                        isSubmitted ? (errors.name ? "true" : "false") : undefined
                    }
                    {...register("name", {
                        required: "이름은 필수 입력입니다.",
                    })}
                />
                <label htmlFor="name">Name</label>
                <div className="invalid-feedback" data-sb-feedback="name:required">
                    A name is required.
                </div>
                {errors.name && <div id="emailHelp" role={"alert"} className="form-text fs-6 text-danger">{errors.name.message}</div>}
            </div>
            <div className="form-floating">
                <input
                 type="email"
                 id="email"
                 name={"email"}
                 className="form-control"
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
                {errors.email && <div id="emailHelp" role={"alert"} className="form-text fs-6 text-danger">{errors.email.message}</div>}
            </div>
            <div className="form-floating">
                <input type="password"
                       id="password"
                       name={"password"}
                       className="form-control"
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
                           }
                       })} />
                <label htmlFor="password">password</label>
                {errors.password && <div id="passHelp" role={"alert"} className="form-text fs-6 text-danger">{errors.password.message}</div>}
            </div>
            <div className="form-floating">
                <input type="password"
                       id="passwordCheck"
                       name={"passwordCheck"}
                       className="form-control"
                       aria-invalid={
                           isSubmitted ? (errors.passwordCheck ? "true" : "false") : undefined
                       }
                       placeholder="Enter your password..."
                       {...register("passwordCheck", {
                           required: "비밀번호 확인은 필수 입력입니다.",
                       })}
                />
                <label htmlFor="passwordCheck">confirm password</label>
                {errors.passwordCheck && <div id="passHelp" role={"alert"} className="form-text fs-6 text-danger">{errors.passwordCheck.message}</div>}
            </div>
            <br/>
            <button type="submit" className="btn btn-primary" id="submitButton" disabled={isSubmitting}>
                가입하기
            </button>
        </form>
    )
}

export default Form
