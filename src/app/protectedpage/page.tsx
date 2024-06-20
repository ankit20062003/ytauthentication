
import React from 'react';
import { requireAuth } from '@/lib/requireAuth';

function ProtectedPage() {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>You can only see this if you are logged in.</p>
    </div>
  );
}

export default requireAuth(ProtectedPage);
