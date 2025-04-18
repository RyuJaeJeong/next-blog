const Detail = async (props) => {
    const { id } = props.params
    const result = await fetch(`http://localhost:3000/api/articles/${id}`);
    const data = await result.json();
    console.log(data)

    return(
        <article className={"w-4/5 md:w-3/5 min-h-[95VH] h-auto mx-auto px-2 py-10 prose max-w-none"}>
            <div className={"w-full h-auto my-5 pb-7"}>
                <h1 className={"mb-0"}>
                    { data.data[0].title }
                </h1>
                <p className={"text-md"}>
                    류재정, { data.data[0].updDttm }
                </p>
            </div>
            <div className={"w-full h-auto my-5 text-xl"} dangerouslySetInnerHTML={{ __html: data.data[0].contents}}></div>
        </article>
    )
}

export default Detail