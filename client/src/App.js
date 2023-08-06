import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignInForm from './pages/SignIn';
import RegistrationForm from './pages/CreateAccount';
import Homepage from './pages/Homepage';
import NavigationBar from './pages/NavigationBar';
import AnimeDetails from './pages/AnimeDetails';
import AnimesPage from './pages/AnimesPage';
import MangasPage from './pages/MangasPage';
import MangaDetails from './pages/MangaDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Homepage />} />
        <Route path="/animeDetails/:mal_id" element={<AnimeDetails />} />
        <Route path="/mangaDetails/:mal_id" element={<MangaDetails />} />
        <Route path="/animes" element={<AnimesPage />} />
        <Route path="/mangas" element={<MangasPage />} />
      </Route>
    </Routes>
  );
}

export default App;
