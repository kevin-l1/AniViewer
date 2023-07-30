import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SignInForm from './SignIn';

function App() {
  const [serverData, setServerData] = useState('');

  useEffect(() => {
    async function readServerData() {
      const resp = await fetch('/api/hello');
      const data = await resp.json();

      console.log('Data from server:', data);

      setServerData(data.message);
    }

    readServerData();
  }, []);

  return (
    <>
<SignInForm />
    </>
  );
}

export default App;
