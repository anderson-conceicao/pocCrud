import{ createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import{Feather} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/rootStackParamList';
import Home from '../telas/Home';
import Lista from '../telas/Lista';
import Novo from '../telas/Novo';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabRoutes(){

    return(
        <Tab.Navigator initialRouteName={'home' }>
            <Tab.Screen 
            name="home" 
            component={Home}
            options={{
                tabBarIcon:({color,size})=>                    
                        <Feather name="home"  size={size} color={color}/>,
                        tabBarLabel:'Home'                   
                
            }}
            /> 

             
            <Tab.Screen 
            name="listar" 
            component={Lista}
            options={{
                tabBarIcon:({color,size})=>                    
                        <Feather name="list"  size={size} color={color}/>,
                        tabBarLabel:'Lista'                   
                
            }}
            />  

             <Tab.Screen 
            name="novo" 
            component={Novo}
            options={{
                tabBarIcon:({color,size})=>                    
                        <Feather name="plus"  size={size} color={color}/>,
                        tabBarLabel:'Novo'                   
                
            }}
            />              
      </Tab.Navigator>
    );
}