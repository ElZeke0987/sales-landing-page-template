import Image from "next/image"
/*Estas son las opciones que aparecen en el carrousel debajo de la imagen a seleccionar
Se ha de tener en cuenta que obj es el objeto dado con la url y nombre de la imagen, definidos previamente
como la iteracion sobre la lista que se le da al parametro "objList" del carrousel

es decir, de la lista que hagas para el carrousel, aqui se veran las "miniaturas" de los items que pusiste en tu
lista

deben cumplir:
{
    name/title: "para el alt"
    imgUrl/url: "obviamente para la imagen"
    id: "para manejar seleccion por click"

}

objOpt es el elemento seleccionado, cumple las mismas directrices que el anterior, pues es un elemento
tomado de la lista que tu diste al carrusel (objList).

explico mejor la dinamica del objOpt (que en este proyecto que usa el template que describo, lo denomine imgSel)
en el archivo de Carousel.js
*/
export default function ImageSelectFrame({obj, objOpt, setObjOpt, onClick}){//obj son los otros elementos en general iterados, objOpt es el objeto actual, el que se ponga en foco, le das funcionalidad individual digamos.
    return(
        <div className={"type-item "+(obj.id==objOpt.id?"type-selected":"")} onClick={onClick}>
            <div className="glass-abs">

            </div>
            <Image src={obj.imgUrl||obj.url} width={1000} height={1000} alt={obj.title||obj.name}/>
        </div>
    )
}