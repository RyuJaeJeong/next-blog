const Card = (props) => {
    return (
        <div
            className={"overflow-hidden h-[12.5rem] bg-white px-4 py-4 shadow-md cursor-pointer lg:transition lg:duration-300 lg:hover:-translate-y-3"}
            key={props.index}>
            <div className={"w-full h-1/5 text-base font-bold truncate"}>
                {props.title}
            </div>
            <div className={"w-full h-3/5 line-clamp-5 text-sm font-2 "}>
                {props.contents}
            </div>
            <div className={"w-full h-1/5 overflow-hidden flex items-end"}>
                <p className={"text-xs overflow-ellipsis font-sans font-2"}>
                    {props.date}
                </p>
            </div>
        </div>
    )
}

export default Card;