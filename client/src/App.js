import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NavigationBar from './pages/NavigationBar';
import AnimeDetails from './pages/AnimeFolder/AnimeDetails';
import AnimesPage from './pages/AnimeFolder/AnimesPage';
import AnimesSeasonalPage from './pages/AnimeFolder/AnimesSeasonalPage';
import AnimesPopularPage from './pages/AnimeFolder/AnimesPopularPage';
import AnimesTopPage from './pages/AnimeFolder/AnimesTopPage';
import MangasPage from './pages/MangaFolder/MangasPage';
import MangasPopularPage from './pages/MangaFolder/MangasPopularPage';
import MangasTopPage from './pages/MangaFolder/MangasTopPage';
import MangaDetails from './pages/MangaFolder/MangaDetails';
import AnimeBookmarksPage from './pages/AnimeFolder/AnimeBookmarksPage';
import MangaBookmarksPage from './pages/MangaFolder/MangaBookmarksPage';
import ReviewsPage from './pages/ReviewsPage';
import AnimesPageTest from './pages/AnimeFolder/AnimesPageTest';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Homepage />} />
        <Route path="/animes" element={<AnimesPageTest />} />
        <Route path="/animesSeasonal" element={<AnimesSeasonalPage />} />
        <Route path="/animesPopular" element={<AnimesPopularPage />} />
        <Route path="/animesTop" element={<AnimesTopPage />} />
        <Route path="/animeDetails/:mal_id" element={<AnimeDetails />} />
        <Route path="/mangas" element={<MangasPage />} />
        <Route path="/mangasPopular" element={<MangasPopularPage />} />
        <Route path="/mangasTop" element={<MangasTopPage />} />
        <Route path="/mangaDetails/:mal_id" element={<MangaDetails />} />
        <Route path="/animeBookmarks" element={<AnimeBookmarksPage />} />
        <Route path="/mangaBookmarks" element={<MangaBookmarksPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        {/* <Route path="/searchBar" element={<ReviewsPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
