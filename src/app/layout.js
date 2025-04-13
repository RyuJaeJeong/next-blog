import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className={"w-full min-h-screen bg-[#F6F7F8]"}>
            <div className={"w-full h-auto"}>
                {children}
            </div>
        </div>
      </body>
    </html>
  );
}
