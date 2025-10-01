import Options from "./dev-panel/options";
import Actions from "./dev-panel/actions";
import "./dev-panel/devPanel.scss";
export default function Logged() {
    return <div>Bienvenido al panel privado 
        <Actions/>
        <Options/>
    </div>;
}
    