import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';
import { Candy } from 'lucide-react';

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Candy className="w-16 h-16 text-candy-pink mx-auto mb-4 animate-bounce-slow" />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}