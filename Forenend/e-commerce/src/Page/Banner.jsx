import Slider from "react-slick";

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="banner">
      <Slider {...settings}>
        <div>
          <img src="/images/banner1.jpg" alt="banner1" />
        </div>
        <div>
          <img src="/images/banner2.jpg" alt="banner2" />
        </div>
        <div>
          <img src="/images/banner3.jpg" alt="banner3" />
        </div>
      </Slider>
    </div>
  );
}

export default Banner;