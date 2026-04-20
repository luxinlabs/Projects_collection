import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

//This is the part that defines the
export const metadata: Metadata = {
  title: "Luxin Zhang",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <Script id="theme-init">
        {`
          (function () {
            try {
              var saved = localStorage.getItem('theme');
              var theme = saved === 'dark' ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {
              document.documentElement.setAttribute('data-theme', 'light');
            }
          })();
        `}
      </Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-SXQD77EZKP" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SXQD77EZKP');
        `}
      </Script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
