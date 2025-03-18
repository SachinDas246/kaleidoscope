import Favorite from "./pages/Favorite/Favorite";
import Movie from "./pages/Movie/Movie";
import Search from "./pages/Search/Search"
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Search/>} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="movie/:id" element={<Movie />} />
        </Routes>
    </BrowserRouter>   
  )
}

export default App
