export default function List() {
    const list = [
        {
            title: '[번역] 모든 프런트엔드 개발자가 알아야 할 접근성 필수 사항',
            contents:'많은 개발자들은 접근성을 대단히 어려운 작업으로 보고, 많은 추가적인 노력이나 전문 지식을 필요로 한다고 생각합니다. 그러나 몇 가지 기본적인 것만 적용해도 큰 영향을 미칠 수 있습니다.',
            date:'2025년 2월 21일',
        },
        {
            title: '네이버 웹툰 FE 면접 회고',
            contents:'네이버 웹툰 프론트엔드 체험형 인턴에 지원했다.\n' +
                '\n' +
                '체계적으로 잘 짜여진 조직문화를 경험하는 것만으로도 영광인데,\n' +
                '대규모 사용자를 대상으로 실질적인 프로덕트를 만들어가는 경험까지 할 수 있다는 점이 매우 매력적으로 다가왔다.\n' +
                '또한 저작도구 개발은 재밌게 몰입할 수 있을 것 같다는 생각이 들었다',
            date:'2025년 2월 21일',
        },
        {
            title: 'velog dashboard v2 - 베타 오픈!!',
            contents:'벨로그 통계를 한 번에 보기 편하게 보고 싶다는 욕구에서 시작했던, 개인 사용 목적으로 만들었던 프로젝트를 23년 11월 말에 오픈했었습니다!',
            date:'2025년 2월 21일',
        },
    ]
    return (
        <div className={"w-3/5 h-full mx-auto px-2 py-10"}>
            <div className={"flex flex-row gap-4 w-full h-[15rem] py-5 "}>
                {
                    list.map((data, key)=>{
                        return (
                            <div className={"basis-1/5 overflow-hidden h-full bg-white px-4 py-4 shadow-md"} key={key}>
                                <div className={"w-full h-1/5 text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap font-sans"}>
                                   {data.title}
                                </div>
                                <div className={"w-full h-3/5 overflow-hidden text-sm  font-sans font-2 text-ellipsis"}>
                                    {data.contents}
                                </div>
                                <div className={"w-full h-1/5 overflow-hidden flex items-end"}>
                                    <p className={"text-xs overflow-ellipsis font-sans font-2"}>
                                        {data.date}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}