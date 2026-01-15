/**
 * It's optimized
 * Draggable
 * and has automatic slide
 * if you need more, contact the dev
 */

import { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import "./styles.css"//Comment if you actually use tailwind or scss

interface SliderProps  {
  slidesList: {image: string, title: string, description: string}[], 
  isInfinite?: boolean, 
  peekOposite?: boolean, 
  hasAnimation?: boolean,
  isDraggable?: boolean
  autoPlay?: boolean
  autoPlayDelay?: number
  direction?: "horizontal" | "vertical"
  rtl?: boolean
  animationDuration?: number
  animationType?: string
  isContinous?: boolean
}


/**
 * Events
 */
type SliderEvents = "initSlider" | 
"indexChange" | 
"indexChangeFromEnd" | 
"dragging" | 
"effectIndex" | 
"prev" | 
"next" | 
"transitionEnd" | 
"reachLimitNoInfinite" | 
"reachStartNoInfinite" | 
"reachEndNoInfinite"

const InfiniteCarouselSlider = forwardRef((props: SliderProps, refP: any) => {
  const [isDraggable, setIsDraggable] = useState<boolean>(props.isDraggable || true)
  const ref = refP
  const [animationDuration, setAnimationDuration] = useState<number>(props.animationDuration != undefined ? props.animationDuration : 500)
  
  let listeners = useRef(new Map<string, Set<Function>>());
  useImperativeHandle(ref, ()=>({
      next,
      prev,
      goToSlide,
      setCurrentIndex,
      getCurrentIndex: ()=>currentIndex,
      stopAutoPlay,
      startAutoPlay,
      setIsDraggable,
      on,
      emit,
      setAnimationDuration
  }))
  
  
  function on(event: SliderEvents, cb: Function) {
    if (!listeners.current.has(event)) {
      listeners.current.set(event, new Set());
    }
    listeners.current.get(event)?.add(cb);
    cb()
    return () => listeners.current.get(event)?.delete(cb);
  }
  function emit(event: SliderEvents, ...args: any[]) {
    listeners.current.get(event)?.forEach(cb => cb(...args));
  }
  
  

  const slides = props.slidesList
  const rtl = props.rtl || false

  const [currentIndex, setCurrentIndex] = useState<{index: number, dir: string}>({index: rtl? slides.length : 1, dir: ""}); // Empieza en 1 (primer slide real)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<number>(0);
  const [currentTranslate, setCurrentTranslate] = useState<number>(0);
  const [prevTranslate, setPrevTranslate] = useState<number>(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState({bool: false, dir: ""});
  
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout|any>(null);

  const animationType = props.animationType ?? "cubic-bezier(0.4, 0, 0.2, 1)"
  const isInfinite = props.isInfinite!==undefined && props.isInfinite ? props.isInfinite : true
  const peekOposite = props.peekOposite!==undefined && props.peekOposite ? props.peekOposite : true
  const hasAnimation = props.hasAnimation!==undefined && props.hasAnimation ? props.hasAnimation : true
 
  const autoPlay = props.autoPlay!==undefined ? props.autoPlay : true
  const autoPlayDelay = props.autoPlayDelay!==undefined && props.autoPlayDelay ? props.autoPlayDelay : 5000
  //const direction = props.direction || "horizontal"
  const isContinous = props.isContinous!==undefined ? props.isContinous : false
  
  // Translate infinite slides: One clon of the last slide at the start and viceversa
  const infiniteSlides = [
    slides[slides.length - 1], // Clon of the last slide
    ...slides,
    slides[0] // Clon of the first slide
  ];

  // Update slide width
  
  useEffect(() => {
    emit("initSlider", listeners.current)
    const updateWidth = () => {
      if (trackRef.current) {
        setSlideWidth(trackRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
    
  }, []);

  const isTransitioningRef = useRef<{bool: boolean, dir?: "prev" | "next"}>({bool: false});

  const updateTransition = () => {
    if(trackRef.current){
      const shouldDisable = isDragging || isTransitioningRef.current.bool || isTransitioning.bool;
      trackRef.current.style.transition = shouldDisable
          ? 'none'
          : `transform ${animationDuration}ms ${animationType}`;
    }
  };

  // Auto-play
  useEffect(() => {
    emit("effectIndex", currentIndex)
    const newTranslate = currentIndex.index * -slideWidth;
    setCurrentTranslate(newTranslate);
    setPrevTranslate(newTranslate);
    startAutoPlay();
    if(currentIndex.index<0||currentIndex.index>slides.length + 1){
      setCurrentIndex({index: getNextIndex(currentIndex.index, currentIndex.dir), dir: currentIndex.dir})
    }
    

    return () => stopAutoPlay();
  }, [currentIndex, slideWidth]);

  useEffect(()=>{
    if((currentIndex.index<=0||currentIndex.index>=slides.length + 1)&&isTransitioning.bool==true){
      const nextIndex = getNextIndex(currentIndex.index, isTransitioning.dir)
      setCurrentIndex({index: nextIndex, dir: currentIndex.dir})
    }
 
  },[isTransitioning])

  const startAutoPlay = () => {
    if(!autoPlay) return
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      if((currentIndex.index<=0||currentIndex.index>=slides.length+1)&&isContinous&&!isTransitioning){
        setIsTransitioning({bool: true, dir: rtl? "prev" : "next"})
        if(currentIndex.index<=0&&rtl){
          return
        }else if(currentIndex.index>=slides.length+1&&!rtl){
          return
        }
      }
      if(currentIndex.index>=0&&currentIndex.index<=slides.length){
        rtl ? prev() : next()
      }
    }, autoPlayDelay)
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    emit("dragging", isDragging)
  }, [isDragging, currentTranslate]);



  // Detects the end of transitions for infinite slides
  const handleTransitionEnd = useCallback(() => {
    emit("transitionEnd", currentIndex, isTransitioning)
    if(currentIndex.index<0||currentIndex.index>slides.length+1){
      return
    }
    if((currentIndex.index<=0||currentIndex.index >= slides.length + 1 )&& isInfinite && !isContinous){
      isTransitioningRef.current.bool = true
      updateTransition()
      setIsTransitioning({bool: true, dir: currentIndex.dir})
      return
    }
    

  }, [currentIndex, slides.length, isTransitioning]);

  useEffect(() => {
    const track = trackRef.current;
    
    if (track) {
      //This is where the end of the transition for each slide is handled.
 
      track.addEventListener('transitionend', handleTransitionEnd);

      
      return () => track.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [handleTransitionEnd]);

  // Function to calculate the next index
  const  getNextIndex = (current: number, direction: string) => {
    
    if (!isInfinite) {
        if (direction === 'next') {
            return Math.min(current + 1, slides.length);
        }
        return Math.max(current - 1, 1);
    } 
    if(isTransitioning.bool){
      console.log("changing to the end without", isTransitioning)


      if (currentIndex.index>=slides.length+1) {

          return 1;
      }
      if (currentIndex.index<=0) {
          return slides.length;
      }
    }
    if(!isTransitioning.bool&&!(currentIndex.index>slides.length+1||currentIndex.index<0)){
        if (currentIndex.index>=slides.length+1) {
          return 1;
        }
        if (currentIndex.index<=0) {
            return slides.length;
        }
    }
    if(isTransitioning.bool&&(currentIndex.index>=1&&currentIndex.index<=slides.length)){
        isTransitioningRef.current.bool = false
        updateTransition()
        setIsTransitioning({bool: false, dir: currentIndex.dir})
      }
    const newIndex = direction === 'next' ? current + 1 : current - 1;
    return newIndex;
  };
  const getPositionX = (e: any) => {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  };

  const handleTouchStart = (e: any) => {
    if(currentIndex.index>=slides.length+1||currentIndex.index<=0||!isDraggable) return
    setIsDragging(true);
    setStartPos(getPositionX(e));
    stopAutoPlay();
  };

  const handlePrevCondition = (direction: 'next' | 'prev') => {
    emit("indexChange", currentIndex, direction)
    setCurrentIndex({index: getNextIndex(currentIndex.index, direction), dir: direction})
    // if((currentIndex.index - 1 <= 0 || currentIndex.index + 1 >= slides.length+1) && !isContinous && changeFromAutoPlayProp){
    //   console.log("handleChangeFromEnd WebiWabo", currentIndex)
    // }
    
    
  };
  const handleTouchMove = (e: any) => {
    if (!isDragging||!isDraggable) return;
    const currentPosition = getPositionX(e);
    const newPosition = prevTranslate + currentPosition - startPos
    if((-newPosition/slideWidth<1||-newPosition/slideWidth>slides.length)&&(!peekOposite)){
      return
    }
    
    setCurrentTranslate(newPosition);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -slideWidth / 4) {
      handlePrevCondition("next");
    } else if (movedBy > slideWidth / 4) {
      handlePrevCondition("prev");
    } else {
      setCurrentTranslate(prevTranslate);
    }
    
    startAutoPlay(); 
  };

  const prev = () => {
    if (isDragging) return;
    handlePrevCondition("prev");
  };

  const next = () => {
    if (isDragging) return;
    handlePrevCondition("next");
  };

  const goToSlide = (index: number) => {
    setCurrentIndex({index: index + 1, dir: "goToSlide"}); 
    stopAutoPlay();
    startAutoPlay();
  };

  // Calculates the actual index of the current slide due to clones
  const getRealIndex = () => {
    if (currentIndex.index === 0) return slides.length - 1;
    if (currentIndex.index === slides.length + 1) return 0;
    return currentIndex.index - 1;
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-overflow ">
          <div
            ref={trackRef}
            className={`${isDraggable?isDragging ? 'cursor-grabbing' : 'cursor-grab': ''}  carousel-track`}
            style={{
              transform: `translateX(${currentTranslate}px)`,
              transition: hasAnimation ?
              (isDragging || isTransitioning.bool || isTransitioningRef.current.bool)
                ? 'none' : `transform ${animationDuration}ms ${animationType}`: 'none',
              willChange: 'transform'
            }}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            onMouseMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          >
            {/*Slides*/}
            {
            infiniteSlides.map((slide, index) => (
              <div
                key={index}
                className="carousel-slide"
                style={{ backgroundImage: `url(${slide.image})` }}
                onDragStart={(e) => e.preventDefault()}
              >
                <div className=" slide-content " />
                <div className="">
                  <h2 className="slide-title">
                    {slide.title}
                  </h2>
                  <p className="slide-description">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))
            }
          </div>

          {/* Navigation buttons */}
          <button
            onClick={()=>prev()}
            className="nav-button prev"
          >
            ‹
          </button>
          <button
            onClick={()=>next()}
            className="nav-button next"
          >
            ›
          </button>

          {/* Indicators */}
          <div className="indicators-container">
            {slides.map((_:any, index:number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`indicator ${
                  index === getRealIndex()
                    ? 'active'
                    : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
export default InfiniteCarouselSlider