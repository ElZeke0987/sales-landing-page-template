import InfiniteCarouselSlider from "./inf-slider/slider"
import "./customizationOver.scss"
import { useRef } from "react"
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
function RandomSlide({slide}:any){
    const randomNumber = Math.floor(Math.random() * 100);
    return <div>
        <h2>{slide.title} random {randomNumber}</h2>
    </div>
}

export default function StorySlider(props:any) {
    const sliderRef = useRef<any>(null);
    return(
        <div className="flex flex-col w-full">
            <h2 className="size-title font-bold w-full text-center">Story Slider</h2>
            <InfiniteCarouselSlider slidesList={exampleSlides}  
            ref={sliderRef} 
            autoPlay={true} 
            autoPlayDelay={5000} 
            rtl 
            animationDuration={100} 
            isContinous={false} 
            animationType="linear"  />
        </div>
    )
} 