import React, { useState } from "react";
import Slider from "react-slick";

function Resizable() {
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(600);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <h2> Resizable Collapsible </h2>
      <button className="button" onClick={() => setWidth(width + 100)}>
        {" "}
        increase{" "}
      </button>
      <button className="button" onClick={() => setWidth(width - 100)}>
        {" "}
        decrease{" "}
      </button>
      <button className="button" onClick={() => setDisplay(!display)}>
        {" "}
        toggle{" "}
      </button>
      <div
        style={{
          width: width + "px",
          display: display ? "block" : "none",
        }}
      >
        <Slider {...settings}>
          <div>
            <img src="./img/food-hero.webp" className="h-24 w-auto" alt="food" loading="lazy" />
            <h3>1</h3>
          </div>
          <div>
            <img src="./img/food-hero.webp" className="h-24 w-auto" alt="food" loading="lazy" />
            <h3>2</h3>
          </div>
          <div>
            <img src="./img/food-hero.webp" className="h-24 w-auto" alt="food" loading="lazy" />
            <h3>3</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Resizable;
