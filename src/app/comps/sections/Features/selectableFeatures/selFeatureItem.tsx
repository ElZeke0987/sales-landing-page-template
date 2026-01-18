"use client";
import Image from "next/image";
import LazyFrame from "../../../reusable/LazyLoad/LazyFrame";
import styles from "./Features.module.scss";
import { SelectableFeatureItemProps, FeatureItemStyles } from "../types";
import { defaultItemStyles } from "../defaultStyles";
import Link from "next/link";

export default function SelectableFeatureItem({ item, index, changeStateFunc, className, widthIcon, heightIcon }: SelectableFeatureItemProps) {

    const Icon = item.icon
    return (
        <div className={className + " flex flex-col justify-center relative"} onClick={() => changeStateFunc(item.val)}>
            <Link href={{
                pathname: "/products",
                query: {
                    category: item.val
                }
            }}
            className="absolute bottom-0 left-0 w-full h-full"></Link>
            {(item.imgUrl||item.icon) && (
                <div className={"w-full category-icon-container"}>
                    <Image 
                        src={item.imgUrl||item.icon.src} 
                        className={"category-icon"}
                        width={widthIcon || 100} 
                        height={heightIcon || 100} 
                        
                        alt={item.title}
                        priority={index < 3}
                    />
                </div>
            )}
            
            {item.title && (
                <h3 className={"category-title"}>
                    <LazyFrame fullViewport={false} threshold={0.2}>
                        <span>{item.title}</span>
                        <div className={"anim-" + index} />
                    </LazyFrame>
                </h3>
            )}
            
            {item.description && (
                <div className={""}>
                    <p className={""}>{item.description}</p>
                </div>
            )}
        </div>
    );
}

