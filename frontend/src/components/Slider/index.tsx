import { SliderProps } from "../../types/Slider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderCompponent(props: SliderProps) {
  const settings = {
    dots: true,
    infinite: true,
      speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    initialSlide: 0
  };

  return (
    <Slider {...settings}>
      {props.content.map((e, index) => (
        <div key={index} className="w-full">
          <img src={e.imagePath} alt={e.name} className="relative w-full bg-center" />
        </div>
      ))}
    </Slider>
  );
}
