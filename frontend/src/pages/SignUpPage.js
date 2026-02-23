import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
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
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/login"
        afterSignUpUrl="/"
        fallbackRedirectUrl="/"
        forceRedirectUrl="/"
        appearance={{
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
            Loading sign up...
          </div>
        }
      />
    </div>
  );
};

export default SignUpPage;
