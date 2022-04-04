import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import Dashboard from './src/pages/dashboard';

export default function App(){
  const StackNavigator = createStackNavigator();

  return(
    <NavigationContainer>
      <StackNavigator.Navigator>
        <StackNavigator.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <StackNavigator.Screen name='Cadastro' component={Cadastro}/>
        <StackNavigator.Screen name='Dashboard' component={Dashboard} options={{headerShown:false}}/>
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
}