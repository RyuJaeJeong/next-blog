"use client"
import { useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
import Link from "next/link";
import {signIn, signOut} from "next-auth/react";

const Menu = ()=>{
    const { data: session, status } = useSession()

    if(session){
        const userNm = session?.user?.name
        return(
            <>
                <Link className="nav-link px-lg-3 py-3 py-lg-4"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="outside"
                      href="#"
                >
                    {userNm}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <button className="dropdown-item custom-dropdown-item" type="button">Action</button>
                    </li>
                    <li>
                        <button className="dropdown-item custom-dropdown-item" type="button">Another action</button>
                    </li>
                    <li>
                        <button className="dropdown-item custom-dropdown-item" type="button" onClick={()=>{
                            if(confirm('정말 로그아웃 하시겠습니까?')) signOut();
                        }}>
                            로그아웃
                        </button>
                    </li>
                </ul>
            </>

        )
    }else{
        return (
            <Link className="nav-link px-lg-3 py-3 py-lg-4"
                  href="#"
                  onClick={() => {
                      signIn();
                  }}
            >
                로그인
            </Link>
        )
    }

}

const BtnLogin = () => {
    return (
        <SessionProvider>
            <Menu/>
        </SessionProvider>
    )
}
export default BtnLogin