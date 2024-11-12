import { Carousel } from "react-bootstrap";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="/img 1.jpg" alt="img" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/img 2.jpg" alt="img" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/img 3.jpg" alt="img" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
