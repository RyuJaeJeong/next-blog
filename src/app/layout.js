import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={"bg-[#F6F7F8]"}>
      <body>
        <div className={"w-full min-h-screen"}>
            <div className={"md:w-2/3 h-[100VH] mx-auto"}>
                <div className="w-full h-16">
                    <Navbar/>
                </div>
                <div className={"w-full h-[calc(100VH-8rem)] bg-red"}>
                    {children}
                </div>
                <div className="w-full h-16">
                    <Footer/>
                </div>
            </div>
        </div>
      </body>
    </html>
  );
}
