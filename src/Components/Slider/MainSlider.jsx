import mainPhoto from "../../assets/images/slider-image-3.jpeg";
import mainPhoto1 from "../../assets/images/slider-image-1.jpeg";
import mainPhoto2 from "../../assets/images/slider-image-2.jpeg";
import Slider from "react-slick";
import { memo } from "react";

function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-[70%_minmax(0,1fr)]">
        <div className="slider-container md:block hidden">
          <Slider {...settings}>
            <div className=" ">
              <img
                src={mainPhoto}
                alt="Slide"
                loading="lazy"
                className=" w-full block h-[500px] object-cover  "
              />
            </div>
            <div>
              <img
                src={mainPhoto1}
                alt="Slide"
                loading="lazy"
                className="  w-full block  h-[500px] object-cover "
              />
            </div>
            <div>
              <img
                src={mainPhoto2}
                alt="Slide"
                loading="lazy"
                className="w-full block  h-[500px] object-cover"
              />
            </div>
          </Slider>
        </div>
        <div>
          <div>
            <img
              src={mainPhoto1}
              alt="Slide"
              loading="lazy"
              className="w-full block h-[250px]  object-cover"
            />
          </div>
          <div>
            <img
              src={mainPhoto2}
              alt="Slide"
              loading="lazy"
              className="w-full block h-[250px] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(MainSlider);
