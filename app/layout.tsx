import React from 'react';

export const metadata = {
  title: 'CCP Bike ERP System',
  description: 'ระบบบริหารจัดการร้าน CCP Bike',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
