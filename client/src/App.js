import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignInForm from './pages/SignIn';
import RegistrationForm from './pages/CreateAccount';
import Homepage from './pages/Homepage';
import NavigationBar from './pages/NavigationBar';
import AnimeDetails from './pages/AnimeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Homepage />} />
        <Route path="/details/:mal_id" element={<AnimeDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
