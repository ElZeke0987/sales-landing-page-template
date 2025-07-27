import Image from "next/image"

export default function ImageSelectFrame({obj, objOpt, setObjOpt, onClick}){//obj son los otros elementos en general iterados, objOpt es el objeto actual, el que se ponga en foco, le das funcionalidad individual digamos.

    return(
        <div className={"type-item "+(obj.id==objOpt.id?"type-selected":"")} onClick={onClick}>
            <div className="glass-abs">

            </div>
            <Image src={obj.imgUrl} width={1000} height={1000} alt={obj.title}/>
        </div>
    )
}