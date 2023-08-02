import './App.css';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import SignInForm from './SignIn';
import RegistrationForm from './CreateAccount';
import Homepage from './Homepage';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default App;
