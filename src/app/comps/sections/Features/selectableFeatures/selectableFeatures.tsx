"use client";
import "./selStyles.scss";
import "../../general.scss";
import Image from "next/image";
import CTA from "../../../reusable/cta/CTA";
import LazyFrame from "../../../reusable/LazyLoad/LazyFrame";
import  SelectableFeatureItem  from "./selFeatureItem";
import { FeaturesProps, FeaturesStyles } from "../types";
import { defaultFeaturesStyles } from "../defaultStyles";
import { useState } from "react"
import SelectedMenu from "./selMenu";

/**
 * Componente FeatureItem - Representa un elemento individual de características
 * @param {Object} props
 * @param {Object} props.item - Objeto con la información del elemento
 * @param {string} props.item.imgUrl - URL de la imagen
 * @param {string} props.item.title - Título del elemento
 * @param {string} props.item.description - Descripción del elemento
 * @param {number} props.index - Índice para animaciones
 * @param {Object} props.itemStyles - Estilos personalizados
 * @param {string} props.itemStyles.container - Clases para el contenedor
 * @param {string} props.itemStyles.image - Clases para la imagen
 * @param {string} props.itemStyles.title - Clases para el título
 * @param {string} props.itemStyles.description - Clases para la descripción
 */

export default function SelectableFeatures({ 
    items = [],
    title = "Nuestras Características",
    cta = { text: "Ver más", href: "#" },
    
}: FeaturesProps) {


    const [categorySelected, setCategorySelected] = useState("rings")

    return (
        <section
            className={`categories-section flex flex-col justify-center`}
            id="categories">
            {title && (
                <h2 className={"categories-title"}>
                    {title}
                </h2>
            )}
            
            <div className={"categories-container flex items-center flex-col w-full"}>
                <div className={"categories-grid flex justify-center"}>
                    {items.map((item, index) => (
                        
                        <SelectableFeatureItem
                            key={index}
                            item={item}
                            index={index}
                            changeStateFunc={setCategorySelected}
                            className={"category-item"}

                            
                        />
                        
                    ))}
                </div>
            <div className="decorative-line w-full flex items-center justify-center">
                
            </div> 
                
            </div>
        </section>
    );
} 