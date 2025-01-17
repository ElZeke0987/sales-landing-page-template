"use client";
import { footerLinksSections, footerRRSS } from "@/global-vars";
import "./footer.scss";

function FooterLinks(){
    return(
        <div className="footer-links-cont flex">
            <div className="footer-other-links flex">
                {console.log(footerLinksSections)}
                {footerLinksSections.map((section,indexSection)=>{
                    return(
                    <div className="foo-section-cont" key={indexSection}>
                        <h4 className="font-bold link-section-title">{section.title}</h4>
                        <div className="foo-links-section flex flex-col">
                            {
                                section.links.map((link, indexLink)=>{
                                    return(
                                    <a key={indexLink}>{link.txt}</a>
                                )
                                })                 
                            }
                        </div>
                    </div>
                    )
                })}
            </div>
            <RRSSCont/>
        </div>
    )
}

function RRSSCont(){
    return(
        <div className="footer-rrss-cont flex">
            <div className="footer-rrss flex">
                {
                    footerRRSS.map((rrss, i)=>{
                        return(
                            <div className="footer-rrss-item" key={i}>
                                <h3>{rrss.alt}</h3>
                                <a></a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default function Footer(){
    return(
        <footer className="landing-footer-cont flex flex-col w-full">
            <div className="landing-footer flex- flex-col">
                <FooterLinks/>
            </div>
        </footer>
    )
}