import Category from "./components/category";
import Navbar from "./components/navbar";
import Slider from "./components/slider";
import { CategoryLists } from "./utils/CategoryList";
import { HomeSlideContents } from "./utils/HomeSlides";

function App() {
  return (
    <div>
      <Navbar />
      <Slider content={HomeSlideContents} />
      <Category content={CategoryLists} />
    </div>
  );
}

export default App;
