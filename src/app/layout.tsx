import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "@/app/components/Navbar";
import {ReduxProvider} from "@/app/redux/provider";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ReduxProvider>
            <Navbar />
            {children}
          </ReduxProvider>
      </body>
    </html>
  )
}
