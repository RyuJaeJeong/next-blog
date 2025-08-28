const Loading = (props)=>{
    return (
        <>
            <div className={`d-flex position-fixed justify-content-center align-items-center ${props.className}`}
                 style={{zIndex: 100, inset: 0, backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                <div className="spinner-border text-primary" role="status" style={{width: "3rem", height: "3rem"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Loading