"use client";
import Image from "next/image";
import LazyFrame from "../../reusable/LazyLoad/LazyFrame";
import styles from "./Features.module.scss";
import { FeatureItemProps, FeatureItemStyles } from "./types";
import { defaultItemStyles } from "./defaultStyles";


export function FeatureItem({ item, index, itemStyles}: FeatureItemProps) {
    const finalStyles = { ...defaultItemStyles, ...itemStyles };
    const Icon = item.icon
    return (
        <div className={`${finalStyles.container} anim-${index + 1}`}>
            
            {(item.imgUrl||item.icon) && (
                <div className={finalStyles.imageContainer}>
                    <Image 
                        src={item.imgUrl||item.icon.src} 
                        className={finalStyles.image}
                        width={500} 
                        height={500} 
                        alt={item.title}
                        priority={index < 3}
                    />
                </div>
            )}
            
            {item.title && (
                <h3 className={finalStyles.title}>
                    <LazyFrame fullViewport={false} threshold={0.2}>
                        <span>{item.title}</span>
                        <div className={"anim-" + index} />
                    </LazyFrame>
                </h3>
            )}
            
            {item.description && (
                <div className={finalStyles.descriptionContainer}>
                    <p className={finalStyles.description}>{item.description}</p>
                </div>
            )}
        </div>
    );
}

