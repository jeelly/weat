import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const SlickSlider = ({reviewImg})=>{
    const testImg = ['https://img.siksinhot.com/seeon/1547445320774049.jpg', 'https://www.smlounge.co.kr/upload/woman/article/202002/thumb/44050-401990-sampleM.jpg', 'https://ppss.kr/wp-content/uploads/2018/12/1-34-540x590.jpg']


    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    return (
    	<Slider {...settings}>
        {
          testImg.map((img, idx)=>(
            <SlideItem key={idx}><img src={img} alt=""/></SlideItem>
          ))
        }				
			</Slider>
    );
}
const SlideItem = styled.div`
  width: 100%;
  height: 200px;
  margin-top:12px;
  img{
    height: 100%;
    margin:auto;
  }


`

export default SlickSlider