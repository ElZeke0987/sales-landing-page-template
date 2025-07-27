import ESearch from "@/e-commerce-app/src/comps/templates/e-search/eSearch";
import Sections from "./comps/sections/Sections";
import EProductPage from "@/e-commerce-app/src/comps/templates/e-product-page/eProductPage";
import EHome from "@/e-commerce-app/src/comps/templates/e-home/eHome";
import Header from "./comps/sections/Header/Header";
import styles from "./page.module.scss";

export default function Home() {
  
  return (
    <div className="">
        <Header extraClass={styles["mtz-header"]} classForNav={styles["mtz-nav"]}/>
        <EHome/>
    </div>
  );
}
