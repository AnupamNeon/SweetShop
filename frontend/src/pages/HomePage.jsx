import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Candy, ShoppingBag, Shield, Sparkles, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Candy className="w-6 h-6" />,
      title: 'Wide Selection',
      description: 'Explore our diverse range of chocolates, candies, cakes, and more!',
      color: 'bg-teal-500',
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Easy Shopping',
      description: 'Simple and intuitive shopping experience with secure checkout.',
      color: 'bg-indigo-500',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Quality Assured',
      description: 'Only the finest quality sweets from trusted suppliers.',
      color: 'bg-sky-500',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Fresh Daily',
      description: 'New treats added regularly to keep things exciting!',
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Decorations - Cleaner colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-slate-600">Welcome to the sweetest shop in town!</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-slate-900">
            <span className="gradient-text-primary">Sweet Shop</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover a world of delicious treats, from artisan chocolates to classic candies. 
            Your sweet tooth will thank you!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg">
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="secondary" size="lg">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-slate-800">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 group"
              >
                <div className={`${feature.color} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-500 to-indigo-600 rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
              Ready to satisfy your sweet cravings?
            </h2>
            <p className="text-teal-50 mb-8 text-lg">
              Join thousands of happy customers and start shopping today!
            </p>
            {!isAuthenticated && (
              <Link to="/register">
                <div className="inline-block bg-white text-teal-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  Create Free Account
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}