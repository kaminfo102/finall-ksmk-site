import './globals.css';
import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';

const vazirmatn = Vazirmatn({ subsets: ['arabic'] });

export const metadata: Metadata = {
  title: 'آموزشگاه ما',
  description: 'آموزشگاه حرفه‌ای برنامه‌نویسی و طراحی وب',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body 
        className={`${vazirmatn.className} min-h-screen`}
        style={{
          '--primary-rgb': '220, 38, 38',
        } as any}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative mt-10">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--primary)/0.1)_0%,transparent_100%)]" />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  fontSize: '1.125rem',
                  padding: '1.25rem',
                  fontFamily: vazirmatn.style.fontFamily,
                },
                className: 'text-lg shadow-lg',
                success: {
                  className: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
                  iconTheme: {
                    primary: 'hsl(var(--primary))',
                    secondary: 'white',
                  },
                },
                error: {
                  className: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
                  iconTheme: {
                    primary: 'hsl(var(--destructive))',
                    secondary: 'white',
                  },
                },
              }}
              closeButton
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}