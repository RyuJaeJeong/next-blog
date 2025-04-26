'use client'

const BtnGoList = (props)=> {
    const className = props.className || ""
    return (
        <button onClick={() => {
            location.href = '/write'
        }} className={`btn btn-neutral ${className}`} >작성하기</button>
    )
}

export default BtnGoList