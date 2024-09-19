import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonImg,
  IonItem,
  IonSkeletonText,
  IonicSlides,
} from "@ionic/react";

import JoinUs from "../../assets/joinus.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";
import "@ionic/react/css/ionic-swiper.css";
import useFirestore from "../../hooks/useFirestore";
import { EventDataModel } from "../../models/Model";
import { colorFill, filter } from "ionicons/icons";

const EventSlides = () => {
  const { data, loading } = useFirestore("events");
  const events = [
    {
      id: 1,
      name: "Event 1",
      image: "https://swiperjs.com/demos/images/nature-1.jpg",
    },
    {
      id: 2,
      name: "Event 2",
      image: "https://swiperjs.com/demos/images/nature-2.jpg",
    },
    {
      id: 3,
      name: "Event 3",
      image: "https://swiperjs.com/demos/images/nature-3.jpg",
    },
    {
      id: 4,
      name: "Event 4",
      image: "https://swiperjs.com/demos/images/nature-4.jpg",
    },
    {
      id: 5,
      name: "Event 5",
      image: "https://swiperjs.com/demos/images/nature-5.jpg",
    },
  ];
  return (
    <Swiper
      className="banner-slider"
      style={{ height: "100%", width: "100%" }}
      modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false,
      // }}
      autoplay={false}
      keyboard={true}
      pagination={true}
      scrollbar={true}
    >
      <SwiperSlide>
        <IonCard
          className="card-bg-image"
          style={{
            backgroundImage: `url(${JoinUs})`,
          }}
        ></IonCard>
        <IonCard className="card-content">
          <IonCardHeader>
            <IonCardTitle>
              <strong>Want to join and share your knowledge?</strong>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Join our community of like-minded individuals who are passionate
              about sharing their expertise and knowledge with others. We value
              the opportunity to connect and learn from each other.
            </p>
          </IonCardContent>
          <IonItem className="item-bg-none">
            <IonButton
              className="btn-join"
              size="large"
              routerLink="/host/signup"
            >
              Join now
            </IonButton>
          </IonItem>
        </IonCard>
      </SwiperSlide>
      <SwiperSlide>
        <IonCard
          className="card-bg-image"
          style={{
            backgroundImage: `url(${JoinUs})`,
          }}
        ></IonCard>
        <IonCard className="card-content">
          <IonCardHeader>
            <IonCardTitle>
              <strong>
                Download the app and join the community of learners
              </strong>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p></p>
          </IonCardContent>
          <IonItem className="item-bg-none">
            <IonButton
              className="btn-join"
              size="large"
              // routerLink="/download/app"
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.phome"
                )
              }
            >
              Download Now
            </IonButton>
          </IonItem>
        </IonCard>
      </SwiperSlide>
      {/* {data.map((event: EventDataModel) => (
        <div>
          <SwiperSlide key={event.id}>
            <IonCard
              className="card-bg-image"
              color={"light"}
              style={{
                backgroundImage: `url(${event.imageUrl})`,
              }}
            >
              <IonCardHeader
                className="card-header"
                style={{
                  position: "absolute",
                  // top: "36%",
                  fontSize: "20px",
                  width: "100%",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                <IonCardTitle className="card-title">
                  <h1>{event.title}</h1>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </SwiperSlide>
        </div>
      ))} */}
    </Swiper>
  );
};

export default EventSlides;
