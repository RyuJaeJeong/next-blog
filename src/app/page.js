import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/list');
  return (
      <div className={"flex w-full min-h-[90VH] justify-center"}>
          <div className="flex items-center prose">
              <h1>
                  Hello, world!
              </h1>
          </div>
      </div>
  );
}
