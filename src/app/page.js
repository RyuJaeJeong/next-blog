import Navbar from "@/src/components/Navbar";

export default function Home() {
  return (
    <div className={"md:w-2/3 h-[100VH] mx-auto"}>
        <div className={"w-full h-16"}>
            <Navbar />
        </div>
        <div className={"flex w-full min-h-[90VH] justify-center"}>
            <div className="flex items-center prose">
                <h1>
                    Hello, world!
                </h1>
            </div>
        </div>
    </div>
  );
}
