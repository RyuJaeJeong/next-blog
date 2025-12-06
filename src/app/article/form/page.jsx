"use client"
import Header from '@/component/header'
import Tiptap from '@/component/tiptap'
import Styles from '@/app/article/form/page.module.css'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { HelpMessageDanger, HelpMessageSuccess, HelpMessage } from '@/component/helpMessage'
import * as React from "react";
import {useRouter} from "next/navigation";


const Form = ()=>{
    const router = useRouter();
    const { register, handleSubmit, formState: { isSubmitting, isSubmitted, errors }, setValue} = useForm();

    register('content', {
        required: '내용을 입력해주세요',
        minLength: { value: 10, message: '최소 10자 이상 입력 해 주세요' }
    });

    const doSubmit = async (data) => {
        try{
            const response = await fetch('/api/article', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const payload = await response.json();
            if(payload.code == 500){
                throw new Error(payload.msg);
            }else if(payload.code == 200){
                router.push("/article");
            }
        }catch (e) {
            console.error(e);
            toast.error(e.message)
        }
    }
    return(
        <>
            <Header image={"/contact-bg.webp"} head={"Form Page"} subhead={"Have questions? I have answers"} meta={""} isPost={false}/>
            <ToastContainer position={"bottom-center"} pauseOnHover={false} autoClose={1000} theme={"colored"}/>
            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="my-5">
                                <form id="contactForm" onSubmit={handleSubmit(doSubmit)}>
                                    <div className="form-floating">
                                        <input type="text"
                                               id="title"
                                               name="title"
                                               className="form-control"
                                               {...register("title", {
                                                    required: "제목은 필수 입력입니다.",
                                                    minLength: {
                                                        value: 2,
                                                        message: "제목은 2글자 이상입니다."
                                                    },
                                                    maxLength: {
                                                        value: 20,
                                                        message: "제목은 최대 255자 까지입니다."
                                                    }
                                               })}
                                        />
                                        <label htmlFor="title">Title</label>
                                        {errors.title && <HelpMessageDanger message={`[ERROR]: ${errors.title.message}`} />}
                                    </div>
                                    <div className="form-floating">
                                        <p className={Styles.editorLabel}>Content</p>
                                        <Tiptap id="content" name="content" setValue={setValue} className={`form-control ${Styles.editorBody}`}/>
                                        {!errors.title && errors.content && <HelpMessageDanger message={`[ERROR]: ${errors.content.message}`} />}
                                    </div>
                                    <br/>
                                    <button type="submit" id="btnSubmit" className="btn btn-primary text-uppercase" disabled={isSubmitting} >
                                        Send
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
export default Form