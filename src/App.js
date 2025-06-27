import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../src/components/Header";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Chef from "./pages/Chef";
import Chefs from "./pages/ChefsPage";
import Footer from "./components/Footer";
import RecipesByCuisine from "./pages/RecipesByCuisine";
import RecipesByDishType from "./pages/RecipesByDishType";
import AllRecipes from "./pages/AllRecipes";
import Signup from "./pages/signup";
import Favorites from "./pages/favorites";
import TipsPage from "./pages/TipsPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import DietRecipes from "./pages/DietRecipes";
import { UserProvider } from "./context/UserContext";

function AppContent() {
  return (
    <>
      <Header />
      <main className="flex-grow min-h-[300px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/chef/:id" element={<Chef />} />
          <Route path="/chefs" element={<Chefs />} />
          <Route path="/recipes-by-cuisine/:cuisineType" element={<RecipesByCuisine />} />
          <Route path="/recipes-by-dish/:dishType" element={<RecipesByDishType />} />
          <Route path="/all-recipes" element={<AllRecipes />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} /> 
          <Route path="/diet-recipes" element={<DietRecipes />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <AppContent />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
