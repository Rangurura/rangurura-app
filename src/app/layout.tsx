"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Next13ProgressBar } from "next13-progressbar";
import { Suspense } from "react";
import { BarLoader, ClipLoader } from "react-spinners";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import logo from "@/assets/images/logo-dark (1).png";
import "@mantine/spotlight/styles.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// export const metadata: Metadata = {
//   title: 'Rangurura',
//   description: '',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Rangurura</title>
        <meta
          name="description"
          content="An All-In-On app for posting suggestions and problems but rwandan citizens"
        />
        <meta
          name="keywords"
          content="rangurura rangurura-app problems-postings"
        />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@1,6..12,300&family=Poppins:ital,wght@0,100;0,300;1,300&family=Roboto:wght@100&display=swap"
          rel="stylesheet"
        />
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </head>
      <body className={poppins.className}>
        <NextUIProvider>
          <MantineProvider>
            <Next13ProgressBar height={"3px"} color="#20603D" />
            <Suspense
              fallback={
                <div className="w-screen h-screen bg-white flex flex-col gap-3 items-center justify-center">
                  <Image
                    alt="Rangurura Logo"
                    src={logo}
                    width={30}
                    height={30}
                  />
                  <ClipLoader color="#001833" size={25} />
                </div>
              }
            >
              {children}
            </Suspense>
          </MantineProvider>
        </NextUIProvider>
        <Toaster />
      </body>
    </html>
  );
}
