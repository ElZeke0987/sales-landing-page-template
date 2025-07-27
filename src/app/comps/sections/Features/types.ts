export interface FeatureItemStyles {
    /** Clases CSS para el contenedor principal del elemento */
    container?: string;
    /** Clases CSS para el contenedor de la imagen */
    imageContainer?: string;
    /** Clases CSS para la imagen */
    image?: string;
    /** Clases CSS para el título */
    title?: string;
    /** Clases CSS para el contenedor de la descripción */
    descriptionContainer?: string;
    /** Clases CSS para el texto de la descripción */
    description?: string;
}

export interface FeaturesStyles {
    /** Clases CSS para la sección completa */
    section?: string;
    /** Clases CSS para el título principal de la sección */
    title?: string;
    /** Clases CSS para el grid de elementos */
    grid?: string;
    /** Estilos para cada elemento individual */
    item?: FeatureItemStyles;
}

export interface FeatureItem {
    /** URL de la imagen del elemento */
    imgUrl: string;
    /** Título del elemento */
    title: string;
    /** Descripción del elemento */
    description: string;
}

export interface CTAConfig {
    /** Texto del botón CTA */
    text: string;
    /** URL de destino del botón */
    href: string;
}

export interface FeatureItemProps {
    /** Item a mostrar en forma de carta */
    item: FeatureItem;
    /** Indice del item para animaciones */
    index: number;
    /** Estilos personalizados para el item */
    itemStyles: FeatureItemStyles;
}

export interface FeaturesProps {
    /** Lista de Features a mostrar en orden horizontal-centrado en la seccion, en forma de cartas */
    items: FeatureItem[];
    /** Titulo de la seccion */
    title?: string;
    /** Configuracion del boton CTA */
    cta?: CTAConfig;
    /** Estilos personalizados para la seccion */
    styles?: FeaturesStyles;
} 