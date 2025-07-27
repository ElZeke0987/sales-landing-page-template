"use client";

import { useState } from "react";
import { emailJsIds, subjects } from "./contactVars"
import CustomSelect from "@/comps/reusable/customSelect/customSelect";
import emailjs from "emailjs-com";

export default function FormContact(){
    const [subject, setSubject]=useState("");
    const [secondSubject, setSecondSubject]=useState("")
    const [status, setStatus] = useState(undefined);
    const [formValues, setFormValues]=useState({
        fullName: "",
        email: "",
        content: "",
    })
    function handleFirstSubjectSelect(opt){
        setSubject(opt);
    }
    function handleSecondSubjectSelect(opt){
        setSecondSubject(opt.txt);
    }
    function handleInputChange(e){
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }
    function handleSubmit(e){
        setStatus("Sending")
        console.log("Submited")
        emailjs.send(emailJsIds.serviceId, emailJsIds.templateId, {subject: subject.title, secondSubject: secondSubject.txt, ...formValues}, emailJsIds.userId)
        .then(res=>{
            console.log("Correo exitosamente enviado", {subject: subject.title, secondSubject: secondSubject.txt, ...formValues})
            setStatus("Correo enviado")
        }).catch(error=>{
            console.error("Error al enviar el correo: ", error)
            setStatus("Hubo un error al enviar el correo");
        })
    }
    return(
        <div className="flex flex-col justify-center contact-form-container w-full">
            <div className="w-full flex flex-col items-center justify-center contact-form-brd overflow-hidden">
                <form className="contact-form flex flex-col " id="contactForm" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label>Full Name</label>
                        <input type="text" name="fullName" onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Email</label>
                        <input type="email" name="email" onChange={handleInputChange}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Subject</label>
                        <div className="subject-gap flex flex-col">
                            <CustomSelect opts={subjects} propTxt="title" onSelect={handleFirstSubjectSelect}/>
                            {subject?.secondSubjects&&<CustomSelect opts={subject.secondSubjects} onSelect={handleSecondSubjectSelect}/>}
                            {
                                subject?.val=="other"&&<input type="text"/>
                            }
                        </div>
                        
                    </div>
                    
                    <div className="flex flex-col">
                        <label>Content of email</label>
                    
                        <textarea name="content" id="input" className="form-control" rows="3" required="required" onChange={handleInputChange}></textarea>
                        
                    </div>
                    
                </form>
                <div className="submit-contact-cont w-full flex justify-center relative">
                    
                    <button className="submit-contact text-center overflow-hidden relative" onClick={handleSubmit}>
                        <div className="anim-box"></div>
                        <span className="text-box">{status?<div>{status}</div>:"Consultar"}</span>
                    </button>
                </div>
                
            </div>
                
            </div>
    )
}