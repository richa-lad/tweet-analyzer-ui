import { React, useState, useEffect } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "./Carousel.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getHousewivesInfo, getUser } from "../../services";
import { PropagateLoader } from "react-spinners";

function Carousel() {
  const [slides, setSlides] = useState([]);
  const getImagesBios = async () => {
    const housewives = await getHousewivesInfo();
    const usernames = Object.keys(housewives);
    const temp = [];
    const temp_slides = [];
    for (let i = 0; i < usernames.length; i++) {
      let res = await getUser(usernames[i]);
      let twitterApiInfo = res.body.data[0];
      temp.push({
        name: housewives[usernames[i]].name,
        bio: housewives[usernames[i]].bio,
        img_url: `${twitterApiInfo.profile_image_url.slice(0, twitterApiInfo.profile_image_url.length-11)}.jpg`,
      });
    }
    for (let i = 0; i < temp.length; i++) {
      temp_slides.push(
        <Slide index={i}>
          <h2 className="carousel-header">{temp[i].name}</h2>
          <img className="carousel-image" src={temp[i].img_url} alt={temp[i].name} height="50%" width="auto"/>
          <p className="carousel-bio">{temp[i].bio}</p>
        </Slide>
      );
    }
    setSlides(temp_slides);
  };

  useEffect(()=> {
    getImagesBios().catch((err) => {
      console.log(err);
    });
  }, [])
  

  if (slides.length > 0) {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={slides.length}
        visibleSlides={1}
        currentSlide={1}
      >
        {" "}
        <ButtonBack>
          <IoIosArrowBack size={70} className="arrow"></IoIosArrowBack>
        </ButtonBack>
        <Slider>{slides}</Slider>
        <ButtonNext>
          <IoIosArrowForward size={70} className="arrow"></IoIosArrowForward>
        </ButtonNext>
      </CarouselProvider>

    );
  } else {
    return (
      <div className="loading-page">
        <PropagateLoader
          className="loading-animation"
          color={"#00e8ef"}
          size={30}
        ></PropagateLoader>
        <div className="loading-phrase">
          <p>Loading Housewife Profiles...</p>
        </div>
      </div>
    );
  }
}

export default Carousel;
