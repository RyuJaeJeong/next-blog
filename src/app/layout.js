import "./globals.css";
import Navbar from "@/src/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className={"w-full h-[150VH] min-h-screen"}>
            <div className={"w-full h-[4rem]"}>
                <Navbar />
            </div>
            <div className={"w-full h-auto"}>
                {children}
            </div>

        </div>
      </body>
    </html>
  );
}
