// import { Inter } from 'next/font/google'
import './globals.css'


export const metadata = {
  // title: 'LoveCode | Learn with Senior Developer',
  // description: 'a website that teach and help people to learn software development',
  title:'Math Games | Practice and Learn',
  description: 'this website helps you to Practice Maths Calculation and Learn Tables'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="">
      {/* <body className={inter.className}>{children}</body> */}
      <body>{children}</body>
    </html>
  )
}
