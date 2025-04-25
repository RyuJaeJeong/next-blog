import Card from "@/src/components/Card";

export default async function List(props) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const params = await props.searchParams;
    let url = `${API_URL}/api/articles`
    if(params.pageNo) url += `?pageNo=${params.pageNo}`
    const result = await fetch(url);
    const data = await result.json();
    const list = data.data;

    return (
        <div className={"w-full h-full mx-auto px-2 py-10"}>
            <div className={"grid lg:grid-cols-3 xl:grid-cols-5 md:gap-x-4 gap-y-4 xl:gap-y-8 w-full h-auto py-5"}>
                {
                    list.map((data, key)=>{
                        return (
                            <Card title={data.title} contents={data.contents} date={data.date} index={key} key={key} />
                        )
                    })
                }
            </div>
        </div>
    );
}