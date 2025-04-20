'use client'

const BtnGoModifyForm = (props)=> {
    const id = props.id
    return (
        <button onClick={() => {
            location.href = `/modify/${id}`
        }} className="btn btn-neutral">수정하기</button>
    )
}

export default BtnGoModifyForm