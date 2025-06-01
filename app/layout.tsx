import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '경찰청 진급 통합 사이트',
  description: '경찰청 진급 시험 시뮬레이터',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
} 