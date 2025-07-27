
import {skillsList} from "@/global-vars";
import "./skills.scss";
import { motion } from "framer-motion";

export default function SkillsTree({setSkillCat, skillCat}){
    return(
        <div className="skills-tree">
            <div className="skills-cat flex w-full justify-center">
                {skillsList.map((cat, i)=>{
                    return(<div className="relative skill-cat-item overflow-hidden">
                            <h3 onClick={()=>setSkillCat(cat)}  className="relative" key={i}>
                                
                                {cat.catName}
                            </h3>
                            {skillCat.catName==cat.catName&&<div className={`anim-box w-full h-full absolute category-${skillCat?.catId}`}></div>}
                        </div>)
                })}
            </div>
            <div className="relative skills-box-cont overflow-hidden">
                <div className="skills-box w-full grid justify-center items-center relative">
                    
                    {skillCat?.catSkills?.map((skill, i)=>{
                        return(<div key={i} className="skill-item grid h-full ">
                            <motion.div key={skillCat.catName} className={`skill-icon skill-icon-${skill.skillId} flex justify-center h-full w-full`}> <div className="icon-cont h-full w-full">{skill.SkillIcon}</div></motion.div>
                            
                        </div>)
                    })}
                    
                </div>
                <motion.div key={skillCat.catName} className={`anim-box w-full h-full absolute category-${skillCat?.catId}`}></motion.div>
            </div>
        </div>
    )
}