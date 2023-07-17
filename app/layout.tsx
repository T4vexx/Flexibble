import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './global.css'

export const metadata = {
  title: 'Flexibble',
  description: 'Apresentação e descobertas de projetos de desenvolvedores inesquecíveis',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}