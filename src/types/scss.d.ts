declare module '*.scss' {
    /** ESTILO SCSS */
    const content: { [className: string]: string };
    export default content;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
} 