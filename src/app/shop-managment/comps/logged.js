import Options from "./dev-panel/options";
import Actions from "./dev-panel/actions";
import "./dev-panel/devPanel.scss";
export default function Logged() {
    return <div className="md:w-[80vw] w-[98vw] flex  flex-col items-center justify-center">
        <h1>Bienvenido al panel privado </h1>
        <Actions/>
        <Options/>
    </div>;
}
    