import { Inter } from "next/font/google";
import '@/assets/globals.css';
import '@/assets/dashboard.css';

const inter = Inter({ subsets: ["latin"] })
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
