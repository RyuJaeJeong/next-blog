import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className={"w-full min-h-screen"}>
            {children}
        </div>
      </body>
    </html>
  );
}
