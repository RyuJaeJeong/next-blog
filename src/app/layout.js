import "./globals.css";
import Navbar from "@/src/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className={"w-full h-[150VH] min-h-screen"}>
            <Navbar />
            {children}
        </div>
      </body>
    </html>
  );
}
