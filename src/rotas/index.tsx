import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from "./tab.routes";
import { ContatoProvider } from "../componentes/ContatoContext";

;

export default function Routes() {
    return (
        <ContatoProvider>
        <NavigationContainer>
            <TabRoutes />
        </NavigationContainer>
        </ContatoProvider>
       
    );
}