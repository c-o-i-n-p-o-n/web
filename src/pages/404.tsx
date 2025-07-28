
// const NotFoundPage = () => {
//     return <h1>TODO: criar página de erro</h1>
// }

// export default NotFoundPage;


'use client';

import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Página não encontrada</h1>
      <p style={styles.message}>
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      <button style={styles.button} onClick={() => router.push('/')}>
        Voltar para a página inicial
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    padding: '4rem',
    fontFamily: 'sans-serif',
    color: '#333',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default NotFoundPage;
