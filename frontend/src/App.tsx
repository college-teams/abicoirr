import LatestProducts from "./components/LatestItems";
import Location from "./components/Location";
import Category from "./components/category";
import Navbar from "./components/navbar";
import PopularProducts from "./components/popularItems";
import Slider from "./components/slider";
import { CategoryLists } from "./utils/CategoryList";
import { HomeSlideContents } from "./utils/HomeSlides";
import Process from "./assets/process.webp";

function App() {
  return (
    <div>
      <Navbar />
      <Slider content={HomeSlideContents} />
      <Category content={CategoryLists} />
      <LatestProducts />
      <Location />
      <PopularProducts />
      <div className=" h-5/6 relative">
        <img className=" object-contain h-5/6" src={Process} alt="process" />
      </div>
    </div>
  );
}

export default App;
