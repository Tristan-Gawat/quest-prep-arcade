import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quest Prep Arcade",
  description: "AI-powered programming learning platform - Learn Python, JavaScript, and HTML/CSS with adaptive quizzes and code challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
