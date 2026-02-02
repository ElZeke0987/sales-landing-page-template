
import EHome from "./comps/eHome";
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
