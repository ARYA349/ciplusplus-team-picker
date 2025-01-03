import './globals.css';

export const metadata = {
  title: 'Ciplusplus Team Picker',
  description: 'A team picker application for Ciplusplus',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
