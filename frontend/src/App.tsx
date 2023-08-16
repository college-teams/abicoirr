import './App.css'
import Category from './components/Category'
import Slider from './components/slider'
import { CategoryLists } from './utils/CategoryList'
import { HomeSlideContents } from './utils/HomeSlides'

function App() {

  return (
    <>
      <div>
        <Slider content={HomeSlideContents} />
        <Category  content={CategoryLists}/>
      </div>
    </>
  )
}

export default App
