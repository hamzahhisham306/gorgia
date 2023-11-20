import React from "react";
import style from "../../assets/style/about/about.module.scss";
import { LazyLoadImage } from 'react-lazy-load-image-component'
function AboutImage({ aboutData }) {
  return (
    <div className={`${style.aboutImage} col-lg-4`}>
      <LazyLoadImage src={aboutData?.main?.image} alt="aboutImage" />
    </div>
  );
}

export default AboutImage;
