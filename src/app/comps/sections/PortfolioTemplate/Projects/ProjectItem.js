import Image from "next/image"
import "./projectItem.scss"

export default function ProjectItem({title, subtitle, text,techs=[], img="/images/dummy/dummy-image.png", deployState, url}){
    return(
        <div className="project-item w-full h-full ">
            <div className="inner-item  flex-col flex justify-center items-center">
                {deployState?<div className="online">Online</div>:<div className="offline">Offline</div>}
                <h3 className="text-center">{title}</h3>
                <div className="down-element relative overflow-hidden">
                    <Image src={img} width={250} height={250} alt="proyecto-img" className="w-full h-full"/>
                    <a className="over-text absolute w-full h-full overflow-hidden" href="">
                        <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center">
                            <h4>{subtitle}</h4>
                            <p className="text-center">{text}</p>
                            <div className="flex">
                                {
                                    techs.forEach(element => {
                                        
                                    })
                                }
                            </div>
                        </div>
                        
                    </a>
                </div>
            </div>
            
            
        </div>
    )
}