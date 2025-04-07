import React from 'react'
import "./banner.css"
import bannerimg from "../../assets/IMG_6704 (2).png"
const Banner = ({data}) => {

  console.log(data)
 
  return (
    <div>
     <img className="banner-img" src={bannerimg}/>
      
    </div>
  )
}

export default Banner
