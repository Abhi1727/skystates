import React from 'react';
import { UserProfile } from '@clerk/clerk-react';

const UserProfilePage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '80vh',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    }}>
      <UserProfile
        routing="path"
        path="/user"
        appearance={{
          elements: {
            rootBox: { width: '100%', maxWidth: '900px' },
            card: { boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }
          }
        }}
      />
    </div>
  );
};

export default UserProfilePage;
