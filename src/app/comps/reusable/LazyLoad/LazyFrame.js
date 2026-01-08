"use client";
import { useEffect, useRef, useState } from "react";

import "./lazyFrame.scss";

/**
 * Componente LazyFrame - Implementa carga perezosa (lazy loading) para sus hijos
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido a mostrar cuando sea visible
 * @param {boolean} props.fullViewport - Si es true, el componente ocupará todo el viewport
 * @param {number} props.threshold - Umbral de visibilidad (0-1)
 * @returns {JSX.Element}
 */
export default function LazyFrame({ children, fullViewport = true, threshold=0.2 }) {
    // Estado para controlar la visibilidad del contenido
    const [isVisible, setIsVisible] = useState(false);
    const lazyElementRef = useRef(null);

    useEffect(() => {
        // Configuración del IntersectionObserver
        const observerOptions = {
            threshold: threshold // El elemento se considera visible cuando el umbral es visible
        };

        // Crear el observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Desconectar el observer una vez que el elemento es visible
                }
            });
        }, observerOptions);

        // Observar el elemento
        if (lazyElementRef.current) {
            observer.observe(lazyElementRef.current);
        }

        // Limpieza al desmontar el componente
        return () => {
            observer.disconnect();
        };
    }, []);

    // Determinar las clases CSS basadas en el estado y props
    const containerClasses = [
        isVisible ? "lazy-load-visible" : "lazy-loading-invisible",
        "flex justify-center items-center",
        fullViewport && "full-viewport"
    ].filter(Boolean).join(" ");

    

    return (
        <div 
            ref={lazyElementRef} 
            className={containerClasses}
        >
            {isVisible ? children : "Cargando..."}
        </div>
    );
}
