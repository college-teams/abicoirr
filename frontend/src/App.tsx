import LatestProducts from "./components/LatestItems";
import Location from "./components/Location";
import Category from "./components/category";
import Navbar from "./components/navbar";
import PopularProducts from "./components/popularItems";
import Slider from "./components/slider";
import { CategoryLists } from "./utils/CategoryList";
import { HomeSlideContents } from "./utils/HomeSlides";

function App() {
  return (
    <div>
      <Navbar />
      <Slider content={HomeSlideContents} />
      <Category content={CategoryLists} />
      <LatestProducts />
      <Location />
      <PopularProducts />
    </div>
  );
}

export default App;
