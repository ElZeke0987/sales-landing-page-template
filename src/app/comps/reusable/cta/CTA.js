export default function CTA({text= "¡Comienza Ahora!"}){
    return (
        <div className="flex justify-center">
            <a href="#" className=" text-white px-6 py-3 rounded-lg shadow bg-blue-500 hover:bg-blue-600 transition duration-300">{text}</a>
        </div>
        

    )
}