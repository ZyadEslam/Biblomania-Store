import "@/styles/globals.css";
import "@/styles/fonts.css";
import AppDataProvider from "@/shared/providers/AppDataProvider";

export const metadata = {
  title: "Biblomania System",
  description: "Biblomania ordering and expenses management system",
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
      <body className="app-body">
        <AppDataProvider>{children}</AppDataProvider>
      </body>
    </html>
  );
}
