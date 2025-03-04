import { AllProducts } from "../../components/AllProducts/AllProducts";
import { Categories } from "../../components/Categories/Categories";
import { Hero } from "../../components/Hero/Hero";
import { Recommendations } from "../../components/Recommendations/Recommendations";
import { SearchBar } from "../../components/SearchBar/SearchBar";

const Home = () => {
  return (
    <>
      <Hero />
      <SearchBar />
      <Categories />
      <Recommendations />
      <AllProducts />
    </>
  )
}

export { Home };