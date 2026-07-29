import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoTrack",
  description: "Track vehicle mileage and maintenance history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>

        <footer className="footer">
          <p>AutoTrack Vehicle Maintenance Tracker</p>
        </footer>
      </body>
    </html>
  );
}