import MenShirts from "./photos/colourful-toy-paper-shirts.jpg";
import WomenShirts from "./photos/spring-wardrobe-switch-still-life_23-2150176694.avif";
import Jewelry from "./photos/workplace-business-modern-male-accessories-laptop-black-background_155003-3944.avif";
import Electronics from "./photos/workplace-business-modern-male-accessories-laptop-black-background_155003-3944.avif";
import { useState, useEffect } from "react";
export default function ProductsWallpaper(){
    const [slide,setSlide] =  useState([
        {id:"1",photo : MenShirts},
        {id:"2",photo : WomenShirts},
        {id:"3",photo : Jewelry},
        {id:"4",photo : Electronics}
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = slide.map(slide => {
        return slide.photo.length;
    });
    const slidePhotos = slide.map(slide => {
        return slide.photo;
    });
    const slideIndex = slide.map(slide => {
        return slide.id;
    });
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]); 
    return(
        <div>
            <div className='over-lay'></div>
            <div key={slideIndex}>{slide.map(slide => {
                return(
                    <h2>{slide.heading}</h2>
                );
            })}</div>
            <img src={slidePhotos[currentIndex]} alt="shirts" className='photos'/>
        </div>
    );
}