import Slider from "../components/Slider";
import CocoBg from "../assets/cocoBG.jpg";
import { HomeSlideContents } from "../utils/HomeSlides";
import { CategoryLists } from "../utils/CategoryList";
import Category from "../components/Category";
import LatestProducts from "../components/LatestItems";
import PopularProducts from "../components/popularItems";
import Location from "../components/Location";
import Info1 from "../assets/lighter.webp";
import Info2 from "../assets/green.webp";
import Info3 from "../assets/smatter.webp";
import { InfoStepsContainer } from "./styled";

const Home = () => {
  return (
    <div>
      <Slider content={HomeSlideContents} />
      <Category content={CategoryLists} />
      <LatestProducts />
      <Location />
      <PopularProducts />
      <div className="relative flex flex-col items-center justify-center">
        {/* <img className="object-contain  bg-fixed" src={CocoBg} alt="CocoBg" /> */}
        <div
          className="h-[550px] w-full object-contain bg-fixed"
          style={{ backgroundImage: `url(${CocoBg})` }}
        />

        <div className="absolute bg-white/75 w-[70%] md:w-[55%] px-4 py-16 rounded-md">
          <div className=" flex flex-col gap-8 items-center justify-center w-[80%] m-auto">
            <p className="relative uppercase text-center text-[3rem] md:text-[3.4rem] font-black text-[#a15125]">
              Changing the world one coconut at a time
            </p>
            <p className="relative text-[1.8rem] md:text-[1.5rem] font-medium text-center">
              Our range of peat-free compost, doormats and gardening accessories
              covers all your plant growing needs. Based on sustainable 100%
              natural coco coir, a by-product of the coconut industry. Coir in
              particular provides ideal peat-free growing conditions for plants.
              Its light texture provides the essential requirements for healthy
              root development. Where-as, when turned into bristles create
              highly effective and hard-wearing shoe scrapers for all our
              doormats.
            </p>
          </div>
        </div>
      </div>

      {/* info steps */}
      <InfoStepsContainer className="relative flex-wrap gap-14 lg:flex-nowrap lg:flex-row flex items-center justify-center p-24 lg:p-32">
        <div className="top" />
        <div className="right" />
        <div className="bottom" />
        <div className="left" />
        <div className="relative flex flex-col items-center justify-center  gap-10">
          <p className="relative uppercase font-black text-[2.5rem]">lighter</p>
          <div>
            <img src={Info1} alt="lighter" className="object-cover" />
          </div>
          <p className="relative italic w-[80%] text-center font-semibold text-2xl">
            Coir compost weighs 4 times less than bagged
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center gap-10">
          <p className="relative uppercase font-black text-[2.5rem]">green</p>
          <div>
            <img src={Info2} alt="lighter" className="object-cover" />
          </div>
          <p className="relative italic w-[80%] text-center font-semibold text-2xl">
            Derived from coconut coir it's sustainable unlike peat
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center  gap-10">
          <p className="relative uppercase font-black text-[2.5rem]">smarter</p>
          <div>
            <img src={Info3} alt="lighter" className="object-cover" />
          </div>
          <p className="relative italic w-[80%] text-center font-semibold text-2xl">
            Less plastic packaging, less watering & better results
          </p>
        </div>
      </InfoStepsContainer>
    </div>
  );
};

export default Home;
