import ESearch from "@/app/products/e-search/eSearch";
import Sections from "./comps/sections/Sections";
import EProductPage from "@/app/products/[id]/e-product-page/eProductPage";
import EHome from "./comps/eHome";
import Header from "./comps/sections/Header/Header";
import styles from "./page.module.scss";

export default function Home() {
  
  return (
    <div className="">
        <Header extraClass={styles["mtz-header"]} classForNav={styles["mtz-nav"]}/>
        {<EHome/>}

    </div>
  );
}
