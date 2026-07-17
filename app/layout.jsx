import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata = {
  title: 'Chaise Hub Admin',
  description: 'Manage Chaise Hub projects, attendance, partner centres, and settlements.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f6a938',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
