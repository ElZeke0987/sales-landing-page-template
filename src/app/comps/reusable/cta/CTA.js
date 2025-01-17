import "./cta.scss";

export default function CTA({text= "¡Comienza Ahora!"}){
    return (
        <div className="flex justify-center ">
            <a href="#" className=" text-white px-6 py-3 rounded-lg shadow  hover:bg-blue-600 transition duration-300 cta-button">{text}</a>
        </div>
        

    )
}