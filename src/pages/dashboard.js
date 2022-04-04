import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

import Home from './drawerPages/home';
import Perfil from './drawerPages/perfil';
import Registro from './drawerPages/registro';

import {createDrawerNavigator} from '@react-navigation/drawer';

export default function Dashboard(){
    const route = useRoute();
    let idUser = route.params?.idUser;

    const DrawerNavigator = createDrawerNavigator();

    return(
        <DrawerNavigator.Navigator screenOptions={{headerStyle:{backgroundColor:'#222222'} ,headerTitleStyle:{color:'#fff'}, headerTintColor: '#fff'}}>
            <DrawerNavigator.Screen name='Home' component={Home} initialParams={{idUsuario:idUser}}/>
            <DrawerNavigator.Screen name='Registro' component={Registro} initialParams={{idUsuario:idUser}}/>
            <DrawerNavigator.Screen name='Perfil' component={Perfil}/>
        </DrawerNavigator.Navigator>
    )
}