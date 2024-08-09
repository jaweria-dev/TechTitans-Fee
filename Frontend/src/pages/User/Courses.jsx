import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import './Courses.css';
import Layout from './../../components/Layout/Layout';
import UserMenu from './../../components/Layout/UserMenu';
import UserHeader from '../../components/Layout/UserHeader';


// courses images
import slide_image_1 from "../../assets/images/img_1.jpeg";
import slide_image_2 from "../../assets/images/img_2.jpeg";
import slide_image_3 from "../../assets/images/img_3.jpeg";
import slide_image_4 from "../../assets/images/img_4.jpeg";
import slide_image_5 from "../../assets/images/img_5.jpeg";
import slide_image_6 from "../../assets/images/img_6.jpeg";
import slide_image_7 from "../../assets/images/img_7.jpeg";
import slide_image_8 from "../../assets/images/img_8.jpeg";
import slide_image_9 from "../../assets/images/img_9.jpeg";
import slide_image_10 from "../../assets/images/img_10.jpeg";
import slide_image_11 from "../../assets/images/img_11.jpeg";




const Courses = () => {
  const [openMenuToggle, setOpenMenuToggle] = useState(false);

useEffect(() => {
  console.log('Sidebar toggle state:', openMenuToggle);
}, [openMenuToggle]);

const OpenMenu = () => {
  setOpenMenuToggle(!openMenuToggle);
};

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
          </div>
          <div className="col-md-9">
            <UserHeader OpenMenu={OpenMenu} />
            <h1 className="heading m-4">Our New Courses</h1>
            <div className="container">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"} style={{color:"black"}}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                  clickable: true, 
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
              >
                <SwiperSlide>
                  <img src={slide_image_1} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_2} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_3} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_4} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_5} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_6} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_7} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_8} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_9} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_10} alt="slide_image" className="slide-image" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={slide_image_11} alt="slide_image" className="slide-image" />
                </SwiperSlide>


                <div className="slider-controller">
                  <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                  </div>
                  <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
