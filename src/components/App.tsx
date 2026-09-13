import { Outlet } from 'react-router';
import { Suspense } from 'react';
import { Header } from './Header';

function App() {
  return (
    <div>
      <Header />
      <div className="w-full max-w-4xl mx-auto p-8">
        {/*Global fallback*/}
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
