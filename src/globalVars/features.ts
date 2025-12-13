/**
 * Configuración del botón CTA (Call to Action)
 * @type {Object}
 * @property {string} text - Texto del botón CTA
 * @property {string} href - URL de destino del botón CTA
 */
export const ctaConfig = {
    text: "Check this benefits",
    href: "#"
};

/**
 * Lista de características/beneficios del producto
 * @type {Array<{
 *   title: string,
 *   description: string,
 *   imgUrl: string
 * }>}
 */
export const featuresList = [
    {
        title: "Water Proof",
        description: "Water-resistant design for worry-free listening in any environment.",
        imgUrl: "/images/features/water-prof.png"
    },
    {
        title: "Noise Canceling",
        description: "Zero external noise distractions, Just you and your music",
        imgUrl: "/images/features/noise-canceling.png"
    },
    {
        title: "Durable Materials",
        description: "Built with durable, tough materials for long-lasting performance.",
        imgUrl: "/images/long-time.png"
    }
];

/**
 * Configuración por defecto para la sección de características
 * @type {Object}
 */
export const defaultFeaturesConfig = {
    title: "Our Features",
    items: featuresList,
    cta: ctaConfig
};

export const IS_PRINTFULL_WEB = false
