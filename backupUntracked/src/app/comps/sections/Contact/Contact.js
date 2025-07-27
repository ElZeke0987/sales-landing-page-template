

import FormContact from "./formContact";
import "./Contact.scss";

export default function Contact(){
    return(
        <section className="w-full flex flex-col items-center justify-center contact-section">
            <div className="">
                <h2>Contact me</h2>
            </div>
            <FormContact/>
        </section>)
}