const Loading = (props)=>{
    return (
        <>
            <div className={`d-flex justify-content-center loadingBox ${props.className} position-absolute w-100 h-100`}>
                <div className="spinner-border text-primary" role="status" style={{width: "3rem", height: "3rem"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default Loading