export interface CTAProps {
    /** Texto del botón */
    text: string,
    /** URL de destino del botón */
    href: string,
    /** Estilos personalizados para el botón */
    ctaStyles: string
}

export interface CTAButtonStyles {
    /** Clases CSS para el contenedor del botón */
    container?: string,
    /** Clases CSS para el botón */
    button?: string,
    /** Clases CSS para el texto del botón */
    text?: string,
    /** Clases CSS para el contenedor de la animación */
    animContainer?: string,
}