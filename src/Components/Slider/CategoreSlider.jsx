import Slider from "react-slick";
import useAuthGetQuery from "../../hooks/useAuthGetQuery";
import { memo } from "react";

function CategoreSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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

  const { data, isPending } = useAuthGetQuery({
    queryKey: ["categore"],
    url: "/api/v1/categories",
  });
  if (isPending) return "Loading...";
  return (
    <div>
      <h1 className="text-3xl  font-light text-center md:text-start py-5 md:text-5xl">
        Shop Popular Categore
      </h1>
      <div className="slider-container">
        <Slider {...settings}>
          {data.data.map((el) => (
            <div key={el._id} className="cursor-pointer">
              <img src={el.image} alt={el.name} className="h-[200px] w-full" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default memo(CategoreSlider);
