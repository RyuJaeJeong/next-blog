'use client'
import { useRouter } from 'next/navigation'

const Pager = ()=> {
    const router = useRouter()
    return (
        <div className={"flex items-center justify-center w-full h-[8%] "}>
                <div className="join">
                    <button className="bg-white join-item btn" onClick={() => { router.push('/list?pageNo=1') }}>1</button>
                    <button className="bg-white join-item btn" onClick={() => { router.push('/list?pageNo=2') }}>2</button>
                    <button className="bg-white join-item btn" onClick={() => { router.push('/list?pageNo=3') }}>3</button>
                    <button className="bg-white join-item btn" onClick={() => { router.push('/list?pageNo=4') }}>4</button>
                    <button className="bg-white join-item btn" onClick={() => { router.push('/list?pageNo=5') }}>5</button>
                    <button className="bg-white join-item btn" onClick={() => { router.push('/list?pageNo=6') }}>6</button>
                    <button className="bg-white join-item btn" onClick={() => { router.push('/list?pageNo=7') }}>7</button>
                    <button className="bg-white join-item btn" onClick={() => { router.push('/list?pageNo=8') }}>8</button>
                    <button className="bg-white join-item btn" onClick={() => { router.push('/list?pageNo=9') }}>9</button>
                </div>
        </div>
    )
}

export default Pager