import "@/styles/globals.css";
import "@/styles/fonts.css";
import { ContextProvider } from "@/context/MyContext";

export const metadata = {
  title: "Biblomania System",
  description: "This is a Biblomania Ordering System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
