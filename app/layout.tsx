import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { Navbar } from "@/components/navbar/navbar"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Health Tracker",
  description: "A web app to track different health metrics.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <NavbarWrapper /> */}
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
