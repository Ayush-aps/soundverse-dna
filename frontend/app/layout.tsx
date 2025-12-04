import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import SideBar from "@/components/sidebar";
import { AudioPlayerProvider } from "@/components/AudioPlayer";
import GlobalPlayer from "@/components/GlobalPlayer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import KeyboardShortcutsModal from "@/components/KeyboardShortcuts";
import { ToastProvider } from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = localFont({
  src: "./fonts/Inter-Regular.otf",
  variable: "--font-inter",
});

const powerGrotesk = localFont({
  src: "./fonts/PowerGrotesk-Regular.otf",
  variable: "--font-power",
});

export const metadata: Metadata = {
  title: "DNA",
  description: "Music generation interface",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${powerGrotesk.variable} antialiased`}
      >
        <ErrorBoundary>
          <ToastProvider>
            <AudioPlayerProvider>
              <div className="flex flex-row h-screen overflow-hidden">
                
                {/* LEFT SIDEBAR */}
                <SideBar />

                {/* MAIN PAGE AREA */}
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
              </div>

              {/* GLOBAL PLAYER*/}
              <GlobalPlayer />

              {/* KEYBOARD SHORTCUTS HELPER */}
              <KeyboardShortcutsModal />
            </AudioPlayerProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
