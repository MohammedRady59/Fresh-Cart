import { useParams } from "react-router-dom";
import useAuthGetQuery from "../../hooks/useAuthGetQuery";
import { Star } from "lucide-react";
import Button from "../../UI/Button";
import Slider from "react-slick";
import RelateProudct from "../RelateCategore/RelateProudct";
import Loading from "../../UI/Loading";
import { memo, useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

function DetailProu() {
  const { AddItemCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 1000,
  };
  const { id } = useParams();
  const { data, isPending } = useAuthGetQuery({
    queryKey: ["detail", `${id}`],
    url: `api/v1/products/${id}`,
  });
  if (isPending) return <Loading />;
  async function TostAddcart(id) {
    try {
      setLoading(true);
      const res = await AddItemCart(id);
      if (res.status === 200) {
        toast.success(`Proudct Added In Cart`, {
          position: "top-center",
          duration: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="py-10 w-5/6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[30%_minmax(0,1fr)] gap-3">
          <div className="slider-container">
            <Slider {...settings}>
              {data.data.images.map((el, idx) => (
                <div key={idx} className="w-full">
                  <img
                    src={el}
                    alt={data.data.title}
                    className="w-full object-cover h-64 md:h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="flex flex-col justify-center p-4">
            <h2 className="font-semibold text-lg md:text-xl">
              {data.data.title}
            </h2>
            <p className="my-4 text-gray-500 text-sm md:text-base">
              {data.data.description}
            </p>
            <h3 className="font-medium text-sm md:text-base">
              {data.data.category.name}
            </h3>
            <div className="flex justify-between items-center my-2 text-sm md:text-base">
              <h3 className="font-medium">{data.data.price} EGP</h3>
              <p className="flex items-center gap-2">
                <Star fill="yellow" className="text-yellow-200" />
                {data.data.ratingsAverage}
              </p>
            </div>
            <Button
              onClick={() => TostAddcart(data.data.id)}
              isloading={loading}
              className="w-full flex justify-center bg-green-500 p-2 text-white font-bold rounded-md transform transition-transform duration-500 disabled:bg-green-200"
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
      <div>
        <RelateProudct id={data.data.category._id} />
      </div>
    </>
  );
}

export default memo(DetailProu);

/* <div className="slider-container">
        <Slider {...settings}>
          {data?.data.data.map((product, index) => (
            <Link to={/productdetails/${product.category.name}/${product.id}} key={index}>
              <div className="mt-2 mb-8 px-3 overflow-hidden ">
                <div className=" shadow-lg p-2 product">
                  <img src={product.imageCover} className="w-full" alt="" />
 */
