import useFilterStore from "../filter/base/filterStore";
import "./typeItem.scss";
function TypeItem({typeObj, propVal="val", propTxt="txt", propAct="act"}) {

    const { addCategory} =useFilterStore()

    function handleCategorySelect(e){
        console.log("Usando este objeto: ", typeObj)
        e.stopPropagation();
        addCategory({val: typeObj[propVal], act: typeObj[propAct]} );
    }
    //El objeto typeObj contiene la informaci n de la categoria que se va a renderizar.
    //Contiene 3 propiedades: val, txt y act.
    //val es el valor de la categoria que se va a renderizar.
    //txt es el texto que se va a mostrar en la interfaz de usuario.
    //act es un booleano que indica si la categoria ya est  seleccionada o no.
    //Si act es true, el bot n de la interfaz de usuario muestra el texto "Remover filtro" y el background del bot n es rojo.
    //Si act es false, el bot n de la interfaz de usuario muestra el texto "Filtrar por categoria" y el background del bot n es azul.
    //Cuando el usuario hace clic en el bot n, se llama a la funci n handleCategorySelect que se encarga de agregar o eliminar la categoria del state del filter.
    return ( 
        <div className="type-item text-center relative overflow-hidden counter-color" onClick={handleCategorySelect}>
            <span className="relative category-name">{typeObj[propTxt]||typeObj[propVal]}</span>
            <span className={`anim-block absolute w-full h-full text-center flex items-center justify-center ${typeObj[propAct]?"anim-bg-remove":"anim-bg-filter"}`} >
                
                    {typeObj[propAct]?"Remover filtro": "Filtrar por categoria"}
            </span>
        </div>
     );
}

export default TypeItem;