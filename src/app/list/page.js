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
        {
            title: 'Spring @Async를 통한 API 응답속도 개선기',
            contents:'회사에서 개발하던 한 프로젝트의 \'파일 업로드 및 파싱 API\'가 테스트 서버에서 종종 타임아웃을 일으켰다.\n' +
                     '프록시 서버의 타임아웃 기준을 상향해서 일시적으로 이 문제를 해결했지만, 근본적으로 더 개선의 여지가 있는 API라는 생각이 들었다.\n' +
                     '그래서 이 API의 응답 속도를 개선하는 것을 태스크로 삼았다.',
            date:'2025년 2월 21일',
        },
        {
            title: 'LLM 서비스에서 프론트엔드 살아남기',
            contents:'라미리포트를 개발하면서 처음 LLM 프로젝트를 시작했을 때만 해도 별로 어렵지 않을 거라 생각했습니다. API 호출해서 결과 보여주면 되는 거 아닌가? 하지만 실제로 부딪혀보니 생각보다 훨씬 복잡한 문제들이 기다리고 있었죠.\n',
            date:'2025년 2월 21일',
        },
        {
            title: '오픈소스로 다 공개한 코코아 제작기',
            contents:'안녕하세요. 벨로그에 오랜만에 글을 적내요. 개발자 겸 회사 대표 겸 강사 겸 작가로 살고 있는 한상훈입니다. 2월 4일 저녁부터 개발을 유튜브 라이브로 공개적으로 시작해서 오늘로 한 2주 정도 개발한 사이트가 있습니다. 바로 코코아입니다.',
            date:'2025년 2월 21일',
        },
        {
            title: '[번역] 타입스크립트 5.8 베타를 소개합니다',
            contents:'오늘부터 타입스크립트 5.8 베타 버전이 출시되었음을 기쁜 마음으로 알려드립니다.\n' +
                '\n' +
                '베타 버전을 사용하시려면 아래 커맨드를 사용하여 npm으로 다운로드 받을 수 있습니다.',
            date:'2025년 2월 21일',
        },
    ]
    return (
        <div className={"w-4/5 md:w-3/5 h-full mx-auto px-2 py-10"}>
            <div className={"grid lg:grid-cols-3 xl:grid-cols-4 md:gap-x-4 gap-y-4 xl:gap-y-8 w-full h-auto py-5"}>
                {
                    list.map((data, key)=>{
                        return (
                            <div className={"overflow-hidden h-[12.5rem] bg-white px-4 py-4 shadow-md cursor-pointer lg:transition lg:duration-300 lg:hover:-translate-y-3"} key={key}>
                                <div className={"w-full h-1/5 text-base font-bold truncate"}>
                                   {data.title}
                                </div>
                                <div className={"w-full h-3/5 line-clamp-5 text-sm font-2 "}>
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