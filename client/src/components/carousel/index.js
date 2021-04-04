import React from "react";
import "./style.css";
class Carousel extends React.Component {
  render() {
    return (
      <>
        <div
          id="carouselExampleControls"
          class="carousel slide carouselContainer"
          data-ride="carousel"
          style={{ marginBottom: "60px" }}
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                class="d-block w-100 carImages"
                src="./images/sign.jpeg"
                alt="First slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100 carImages"
                src="./images/sign.jpeg"
                alt="Second slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100 carImages"
                src="https://picsum.photos/id/1010/1600/450"
                alt="Third slide"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </>
    );
  }
}

export default Carousel;
