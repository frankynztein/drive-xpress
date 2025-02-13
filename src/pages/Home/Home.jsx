import { Categories } from "../../components/Categories/Categories";
import { Recommendations } from "../../components/Recommendations/Recommendations";
import { SearchBar } from "../../components/SearchBar/SearchBar";

const Home = () => {
  return (
    <>
      <SearchBar />
      <Categories />
      <Recommendations />
    </>
  )
}

export { Home };