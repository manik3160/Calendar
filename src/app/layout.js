import { Playfair_Display, Crimson_Pro, Homemade_Apple } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
});

const homemade = Homemade_Apple({
  variable: "--font-homemade",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Calendar - Wall Edition",
  description: "A beautifully crafted obsidian-styled wall calendar component.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${crimson.variable} ${homemade.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
