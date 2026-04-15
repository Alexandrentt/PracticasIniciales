import React, { useState } from 'react';

interface LoginModalProps {
  onLoginGoogle: () => void;
  onLoginEmail: (email: string, pass: string, isRegister: boolean) => void;
  onCancel: () => void;
  error?: string | null;
  onClearError?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ 
  onLoginGoogle, 
  onLoginEmail, 
  onCancel, 
  error,
  onClearError
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Changed default to true so it defaults to "Crear Cuenta"
  const [isRegistering, setIsRegistering] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLoginEmail(email, password, isRegistering);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-md academic-card p-8 rounded-3xl shadow-2xl relative my-8">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 academic-body hover:academic-primary transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 academic-primary rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-academic-primary/40">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h2 className="text-2xl font-bold academic-primary mb-2 heading-serif">
            {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>
          <p className="academic-body text-sm">
            {isRegistering 
              ? 'Regístrate para guardar tu avance.' 
              : 'Inicia sesión para recuperar tu progreso.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl academic-error text-sm text-center">
            {error}
          </div>
        )}

        {/* Google Button */}
        <button
          onClick={onLoginGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white academic-body font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:bg-slate-100 mb-6"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {isRegistering ? 'Registrarse con Google' : 'Continuar con Google'}
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-academic-primary/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-academic-light academic-body">O usa tu correo</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium academic-primary mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-academic-primary/20 rounded-xl px-4 py-3 academic-body placeholder-academic-body focus:outline-none focus:ring-2 focus:ring-academic-primary/40 focus:border-academic-primary transition-all"
              placeholder="carnetEstudiante@cunoc.edu.gt"
            />
          </div>
          <div>
            <label className="block text-sm font-medium academic-primary mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-academic-primary/20 rounded-xl px-4 py-3 academic-body placeholder-academic-body focus:outline-none focus:ring-2 focus:ring-academic-primary/40 focus:border-academic-primary transition-all"
              placeholder="Tu contraseña segura"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-academic-primary hover:bg-academic-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-academic-primary/40 mt-2"
          >
            {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => {
              setIsRegistering(!isRegistering);
              if (onClearError) onClearError();
            }}
            className="academic-primary hover:academic-success text-sm font-medium transition-colors"
          >
            {isRegistering 
              ? '¿Ya tienes cuenta? Inicia sesión' 
              : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
};