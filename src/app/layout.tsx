import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UrCampusFellowship | Find your denomination on campus',
  description: 'Discover and join a faith community on your university campus in Ghana.',
  generator: 'Mmabiaa',
  icons: {
    icon: [
      {
        url: 'https://i.pinimg.com/736x/59/a5/0a/59a50aa4fcda0cc8409b793810442756.jpg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'https://i.pinimg.com/736x/59/a5/0a/59a50aa4fcda0cc8409b793810442756.jpg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: 'https://i.pinimg.com/736x/59/a5/0a/59a50aa4fcda0cc8409b793810442756.jpg',
        type: 'image/jpg',
      },
    ],
    apple: 'https://i.pinimg.com/736x/59/a5/0a/59a50aa4fcda0cc8409b793810442756.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
