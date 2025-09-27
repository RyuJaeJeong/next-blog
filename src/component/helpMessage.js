const HelpMessageDanger = (props) => {
    return (
        <div role="alert" className={`form-text text-danger fs-6`}>{props.message}</div>
    )
}

const HelpMessageSuccess = (props) => {
    return (
        <div role="alert" className={`form-text text-success fs-6`}>{props.message}</div>
    )
}

const HelpMessage = (props) => {
    return (
        <div role="alert" className={`form-text ${props.textColor} fs-6`}>{props.message}</div>
    )
}

export {HelpMessageDanger, HelpMessageSuccess, HelpMessage}