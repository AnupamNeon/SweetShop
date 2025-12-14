import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="glass-card border-t border-white/20 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Made with 🍬 by Sweet Shop Team © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}