import { SliderProps } from "../../types/Slider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderCompponent(props: SliderProps) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
  };

  return (
    <Slider {...settings}>
      {props.content.map((e, index) => (
        <div key={index}>
          <img src={e.imagePath} alt={e.name} />
        </div>
      ))}
    </Slider>
  );
}
