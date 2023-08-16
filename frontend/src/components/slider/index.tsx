import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { SwiperSlider, SwipperWrapper } from "./styled";
import { SliderProps } from "../../types/Slider";

export default function Slider(props: SliderProps) {
  return (
    <>
      <SwipperWrapper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {props.content.map((e) => (
          <SwiperSlider>
            <img src={e.imagePath} alt={e.name} />
          </SwiperSlider>
        ))}
      </SwipperWrapper>
    </>
  );
}
