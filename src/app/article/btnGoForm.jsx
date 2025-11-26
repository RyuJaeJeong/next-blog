"use client"
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'

const ButtonTag = ()=>{
    const router = useRouter();
    const { data: session, status } = useSession();
    return (
        <button className={"btn btn-primary text-uppercase"}
                disabled={(!session || !session?.user)?true:false}
                onClick={() => {
                    router.push("/article/form");
                }}>
            New Post
        </button>
    )
}


const BtnGoForm = () => {
    return (
        <SessionProvider>
            <ButtonTag />
        </SessionProvider>
    )
}

export default BtnGoForm