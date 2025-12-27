"use client";
import styles from "./Features.module.scss";
import "../general.scss";
import Image from "next/image";
import CTA from "../../reusable/cta/CTA";
import LazyFrame from "../../reusable/LazyLoad/LazyFrame";
import { FeatureItem } from "./FeatureItem";
import { FeaturesProps, FeaturesStyles } from "./types";
import { defaultFeaturesStyles } from "./defaultStyles";


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

export default function Features({ 
    items = [],
    title = "Nuestras Características",
    cta = { text: "Ver más", href: "#" },
    styles: customStyles = {}
}: FeaturesProps) {

    const finalStyles = { ...defaultFeaturesStyles, ...customStyles };

    return (
        <section 
            className={`${finalStyles.section} ${styles["features-section"]} z-50`}
            id="features"
        >
            {title && (
                <h2 className={finalStyles.title}>
                    {title}
                </h2>
            )}
            
            <div className={styles["features-cont"]}>
                <div className={finalStyles.grid}>
                    {items.map((item, index) => (
                        <FeatureItem 
                            key={index}
                            item={item}
                            index={index}
                            itemStyles={finalStyles.item || {}}
                        />
                    ))}
                </div>
                
                {cta && (
                    <CTA 
                        text={cta.text}
                        href={cta.href}
                        ctaStyles={styles["cta-button"]}
                    />
                )}
            </div>
        </section>
    );
} 