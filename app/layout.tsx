import "./globals.css";

export const metadata = {
  title: "Metin2 Website",
  description: "Modernisierte Metin2 Web-App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-gray-100 text-gray-900">
        {/* HEADER */}
        <header className="bg-gray-900 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">Metin2 Server</h1>
            <nav className="flex gap-4">
              <a href="/" className="hover:text-gray-300">Home</a>
              <a href="/register" className="hover:text-gray-300">Registrieren</a>
              <a href="/login" className="hover:text-gray-300">Login</a>
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="container mx-auto p-4">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white p-4 mt-10">
          <div className="text-center">
            © {new Date().getFullYear()} Dein Metin2 Server
          </div>
        </footer>
      </body>
    </html>
  );
}
