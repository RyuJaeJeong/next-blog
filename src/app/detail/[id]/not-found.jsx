'use client'

export default function Error({ error, reset }) {
    return (
        <article className={"prose max-w-none w-full mt-[20VH] text-center"}>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => {
                        location.href = "/"
                    }
                }
            >
                목록으로 돌아가기
            </button>
        </article>
    )
}