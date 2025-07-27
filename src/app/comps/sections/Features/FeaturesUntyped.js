"use client";
import styles from "./Features.module.scss";
import "../general.scss";
import Image from "next/image";
import CTA from "../../reusable/cta/CTA";
import LazyFrame from "../../reusable/LazyLoad/LazyFrame";

/**
 * Componente FeatureItem - Representa un elemento individual de características
 * @param {Object} props
 * @param {Object} props.item - Objeto con la información del elemento
 * @param {string} props.item.imgUrl - URL de la imagen
 * @param {string} props.item.title - Título del elemento
 * @param {string} props.item.description - Descripción del elemento
 * @param {number} props.index - Índice para animaciones
 * @param {Object} props.styles - Estilos personalizados
 * @param {string} props.styles.container - Clases para el contenedor
 * @param {string} props.styles.image - Clases para la imagen
 * @param {string} props.styles.title - Clases para el título
 * @param {string} props.styles.description - Clases para la descripción
 */
function FeatureItemUnTyped({ item, index, styles }) {
    const defaultStyles = {
        container: "md:w-64 flex flex-col " + styles["feature-item"],
        imageContainer: "flex justify-center " + styles["feature-item-img-cont"],
        image: "rounded-full w-auto " + styles["feature-item-img"],
        title: "text-center font-extrabold " + styles["feature-item-title"],
        descriptionContainer: "flex justify-center w-full " + styles["feature-item-desc-cont"],
        description: "text-center " + styles["feature-item-desc"]
    };

    const finalStyles = { ...defaultStyles, ...styles };

    return (
        <div className={`${finalStyles.container} anim-${index + 1}`}>
            {item.imgUrl && (
                <div className={finalStyles.imageContainer}>
                    <Image 
                        src={item.imgUrl} 
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
                    <LazyFrame fullViewport={false}>
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

/**
 * Componente Features - Muestra una sección de características/beneficios
 * @param {Object} props
 * @param {Array} props.items - Lista de elementos a mostrar
 * @param {string} props.title - Título de la sección
 * @param {Object} props.cta - Configuración del botón CTA
 * @param {string} props.cta.text - Texto del botón
 * @param {string} props.cta.href - URL del botón
 * @param {Object} props.styles - Estilos personalizados
 * @param {string} props.styles.section - Clases para la sección
 * @param {string} props.styles.title - Clases para el título de la sección
 * @param {string} props.styles.grid - Clases para el grid
 * @param {Object} props.styles.item - Estilos para los items
 * @returns {JSX.Element}
 */
export default function Features({ 
    items = [],
    title = "Nuestras Características",
    cta = { text: "Ver más", href: "#" },
    styles = {}
}) {
    const defaultStyles = {
        section: "w-full flex flex-col py-16 justify-center",
        title: "text-lg md:text-3xl font-extrabold text-center " + styles["features-title"],
        grid: "md:grid-cols-3 gap-8 " + styles["features-cont"],
        item: {}
    };

    const finalStyles = { ...defaultStyles, ...styles };

    return (
        <section 
            className={finalStyles.section}
            id="features"
        >
            {title && (
                <h2 className={finalStyles.title}>
                    {title}
                </h2>
            )}
            
            <div className="features-cont flex flex-col">
                <div className={finalStyles.grid}>
                    {items.map((item, index) => (
                        <FeatureItem 
                            key={index}
                            item={item}
                            index={index}
                            styles={finalStyles.item}
                        />
                    ))}
                </div>
                
                {cta && (
                    <CTA 
                        text={cta.text}
                        href={cta.href}
                    />
                )}
            </div>
        </section>
    );
}