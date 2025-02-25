import Link from 'next/link'
import Image from "next/image";

const Navbar = () => {
    return(
        <div className={"block w-full h-[4rem] border-b border-gray-400 bg-white"}>
            <div className={"block w-[90%] md:w-[60%] h-[4rem] m-auto"}>
                <div className={"flex flex-row justify-between w-full h-full px-2 py-4 gap-2"}>
                    <div className={"basis-[5%] flex items-center justify-center h-full "}>
                        <Link href={"#"}>
                            <p className={"text-3xl"}>Logo</p>
                        </Link>
                    </div>
                    <div className={"basis-auto flex gap-2 items-center h-full"}>
                        <button className={"bg-black hidden md:inline px-2 py-2 w-[6rem] h-10 text-white font-bold text-[1rem] rounded-2xl transition duration-300 hover:bg-gray-800 active:bg-gray-700"}>
                            작성하기
                        </button>
                        <Image src={"/profile.jpg"} alt={"profile"} width={40} height={40} className={"border border-gray-300 rounded-[20rem] cursor-pointer hover:opacity-50"}></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar