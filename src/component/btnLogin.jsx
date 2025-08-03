"use client"
import { useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
import Link from "next/link";
import {signIn, signOut} from "next-auth/react";

const Menu = ()=>{
    const { data: session, status } = useSession()
    const userNm = (session)?session.user.name:"로그인"
    const action = ()=>{
        if(!session){
            signIn()
        }else{
            signOut()
        }
    }
    return(
        <Link className="nav-link px-lg-3 py-3 py-lg-4" href="#" onClick={()=>{
            action()
        }}>{userNm}</Link>
    )
}

const BtnLogin = ()=>{
    return(
        <SessionProvider>
            <Menu />
        </SessionProvider>
    )
}
export default BtnLogin