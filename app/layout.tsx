import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bank Robbery Slot Machine",
  description: "A thrilling slot machine game with a bank heist theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
