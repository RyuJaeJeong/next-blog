'use client'

const BtnGoList = (props)=> {
    const className = props.className
    return (
        <button onClick={() => {
            location.href = '/'
        }} className={`btn btn-outline hover:bg-[#F6F7F8] hover:border hover:border-[#1E1F22FF] ${className}`} >뒤로가기</button>
    )
}

export default BtnGoList