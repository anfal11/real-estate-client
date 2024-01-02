import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from '../../assets/Banner/img1.jpg'
import img2 from "../../assets/Banner/img2.jpg";
import img3 from "../../assets/Banner/img3.jpg";
import img4 from "../../assets/Banner/img4.jpg";
import img5 from "../../assets/Banner/img5.jpg";
import img6 from "../../assets/Banner/img6.jpg";
import img7 from "../../assets/Banner/img7.jpg";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Carousel interval={2000} autoPlay infiniteLoop>
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
        </div>
        <div>
          <img src={img4} />
        </div>
        <div>
          <img src={img5} />
        </div>
        <div>
          <img src={img6} />
        </div>
        <div>
          <img src={img7} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
