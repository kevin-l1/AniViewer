import Homepage from './pages/Homepage';
import NavigationBar from './NavigationBar';
import AnimesPage from './pages/AnimeFolder/AnimesPage';
import AnimesSeasonalPage from './pages/AnimeFolder/AnimesSeasonalPage';
import AnimeDetails from './pages/AnimeFolder/AnimeDetails';
import MangasPage from './pages/MangaFolder/MangasPage';
import MangaDetails from './pages/MangaFolder/MangaDetails';
import SearchPage from './pages/SearchPage';
import BookmarksPage from './pages/Bookmarks';
import ReviewsPage from './pages/ReviewsPage';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [animePage, setAnimePage] = useState(1);
  const [mangaPage, setMangaPage] = useState(1);
  const [seasonalAnimePage, setSeasonalAnimePage] = useState(1);
  const [pageState, setPageState] = useState('');

  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Homepage setState={setPageState} />} />
        <Route
          path="/animes"
          element={
            <AnimesPage
              page={animePage}
              setPage={setAnimePage}
              setState={setPageState}
            />
          }
        />
        <Route
          path="/animesSeasonal"
          element={
            <AnimesSeasonalPage
              page={seasonalAnimePage}
              setPage={setSeasonalAnimePage}
              setState={setPageState}
            />
          }
        />
        <Route
          path="/animeDetails/:mal_id"
          element={<AnimeDetails state={pageState} />}
        />
        <Route
          path="/mangas"
          element={<MangasPage page={mangaPage} setPage={setMangaPage} />}
        />
        <Route path="/mangaDetails/:mal_id" element={<MangaDetails />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route
          path="/reviews"
          element={<ReviewsPage setState={setPageState} />}
        />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
