import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={"bg-[#F6F7F8]"}>
      <body>
        <div className={"w-full min-h-screen"}>
            <div className={"w-full h-[100VH]"}>
                <div className="md:w-2/3 mx-auto h-16">
                    <Navbar/>
                </div>
                <div className={"w-full h-[calc(100VH-8rem)] overflow-scroll"}>
                    <div className={"md:w-2/3 h-screen mx-auto"}>
                        {children}
                    </div>
                </div>
                <div className="md:w-2/3 mx-auto h-16">
                    <Footer/>
                </div>
            </div>
        </div>
      </body>
    </html>
  );
}
