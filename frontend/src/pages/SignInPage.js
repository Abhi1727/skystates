import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  const [searchParams] = useSearchParams();
  const afterSignInUrl = searchParams.get('redirect_url') || searchParams.get('__clerk_return_back_url') || '/';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/sign-up"
        afterSignInUrl={afterSignInUrl}
        fallbackRedirectUrl={afterSignInUrl}
        forceRedirectUrl={afterSignInUrl}
        appearance={{
          baseTheme: undefined,
          variables: {
            colorBackground: '#ffffff',
            colorInputBackground: '#ffffff',
            colorInputText: '#1a1a2e',
            borderRadius: '12px'
          },
          elements: {
            rootBox: { width: '100%', maxWidth: '420px' },
            card: { boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }
          }
        }}
        fallback={
          <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>
            Loading sign in...
          </div>
        }
      />
    </div>
  );
};

export default SignInPage;
