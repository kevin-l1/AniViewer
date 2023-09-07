import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import NavigationBar from './NavigationBar';
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
import SearchPage from './pages/SearchPage';
import BookmarksPage from './pages/Bookmarks';

function App() {
  const [animePage, setAnimePage] = useState(1);
  const [mangaPage, setMangaPage] = useState(1);
  const [seasonalAnimePage, setSeasonalAnimePage] = useState(1);
  const [animeState, setAnimeState] = useState('');

  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Homepage />} />
        <Route
          path="/animes"
          element={
            <AnimesPage
              page={animePage}
              setPage={setAnimePage}
              state={animeState}
              setState={setAnimeState}
            />
          }
        />
        <Route
          path="/animesSeasonal"
          element={
            <AnimesSeasonalPage
              page={seasonalAnimePage}
              setPage={setSeasonalAnimePage}
              state={animeState}
              setState={setAnimeState}
            />
          }
        />
        <Route path="/animesPopular" element={<AnimesPopularPage />} />
        <Route path="/animesTop" element={<AnimesTopPage />} />
        <Route
          path="/animeDetails/:mal_id"
          element={<AnimeDetails state={animeState} />}
        />
        <Route
          path="/mangas"
          element={<MangasPage page={mangaPage} setPage={setMangaPage} />}
        />
        <Route path="/mangasPopular" element={<MangasPopularPage />} />
        <Route path="/mangasTop" element={<MangasTopPage />} />
        <Route path="/mangaDetails/:mal_id" element={<MangaDetails />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/animeBookmarks" element={<AnimeBookmarksPage />} />
        <Route path="/mangaBookmarks" element={<MangaBookmarksPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
