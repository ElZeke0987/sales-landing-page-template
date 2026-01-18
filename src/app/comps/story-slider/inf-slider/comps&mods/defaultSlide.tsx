
import React from "react"

interface DefaultSlideProps{
    slide: {image: string, title: string, description: string}
    classNameSlideContent: string
    classNameSlideTitle: string
    classNameSlideDescription: string
}

const DefaultSlide: React.FC<DefaultSlideProps> = (props: DefaultSlideProps)=>{
    const {slide, classNameSlideContent, classNameSlideTitle, classNameSlideDescription} = props

    return(<div
            className="inner-slide"
            style={{ backgroundImage: `url(${slide.image})` }}>

                <div className={" slide-content "+classNameSlideContent} />

                <div className="">
                    <h2 className={"slide-title "+classNameSlideTitle}>
                        {slide.title}
                    </h2>
                    <p className={"slide-description "+classNameSlideDescription}>
                        {slide.description}
                    </p>
                </div>
            </div>)
}

export default DefaultSlide