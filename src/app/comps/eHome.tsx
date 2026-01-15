"use client"
import MtzHero from "./mtz-hero/mtzHero";
import OutsProds from "./epic-outstanding-prods/outsProds"
import LazyFrame from "./reusable/LazyLoad/LazyFrame"
import Categories from "./categories/categories"
import InfiniteCarouselSlider  from "./story-slider/inf-slider/slider"
import { useEffect, useRef } from "react"

const exampleSlides = [
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      title: 'Montañas Majestuosas',
      description: 'Descubre la belleza natural'
    },
    {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
      title: 'Playas Paradisíacas',
      description: 'Relájate junto al mar'
    },
    {
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop',
      title: 'Ciudades Vibrantes',
      description: 'Explora la vida urbana'
    },
    {
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
      title: 'Bosques Encantados',
      description: 'Sumérgete en la naturaleza'
    },
    {
      image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&h=800&fit=crop',
      title: 'Atardeceres Únicos',
      description: 'Momentos inolvidables'
    }
  ];
export default function EHome(){
    const sliderRef = useRef<any>(null);
    
    useEffect(()=>{
        
    },[])
    return(
        <div className="flex flex-col">
            
                {<LazyFrame fullViewport threshold={0.2}><MtzHero/></LazyFrame>}
            
                { <LazyFrame fullViewport threshold={0.2}><Categories/></LazyFrame> }
            
                { <LazyFrame fullViewport threshold={0.2}><OutsProds/></LazyFrame> }

                {<LazyFrame fullViewport threshold={0.2} >
                  <div className="flex flex-col w-full">
                    <h2>Story Slider</h2>
                    <InfiniteCarouselSlider slidesList={exampleSlides}  ref={sliderRef} autoPlay={true} autoPlayDelay={5000} rtl animationDuration={100} isContinous={false} animationType="linear"/>
                  </div>
                </LazyFrame>}
        </div>
    ) 
}