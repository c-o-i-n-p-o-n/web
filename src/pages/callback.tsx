import { useEffect } from 'react';
import { AuthService } from '../services/AuthService';


const authService = new AuthService();

const Callback = () => {
  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const verifier = sessionStorage.getItem('pkce_code_verifier')!;
      if (code && verifier) {
        try {
          const tokenData = await authService.exchangeCodeForToken(code, verifier);
          localStorage.setItem('access_token', tokenData.access_token);
          alert('Login efetuado com sucesso!');
          window.location.href = '/';
        } catch (err) {
          console.error(err);
          alert('Erro ao autenticar');
        }
      }
    };
    handleAuth();
  }, []);

  return <p>Processando autenticação...</p>;
};

export default Callback;
