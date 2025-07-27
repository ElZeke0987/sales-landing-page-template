"use client";

import { useState } from "react";
import SkillsTree from "./SkillsTree";



export default function Skills(){

    const [skillCat, setSkillCat] = useState("");


    return(
    <section className="skills-section">
        <div className="w-full flex justify-center">
            <h2>Skills</h2>
        </div>
        <div className="skills-list-cat">
            <SkillsTree setSkillCat={setSkillCat} skillCat={skillCat}/>
        </div>
    </section>)
}