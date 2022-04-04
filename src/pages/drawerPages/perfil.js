import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import estiloPerfil from '../../styles/estiloPerfil';

import {useNavigation} from '@react-navigation/native';
import firebaseApp from '../../firebase/firebaseConnect';
import {getAuth, signOut} from 'firebase/auth';

export default function Perfil(){
    const navigation = useNavigation();
    const auth = getAuth(firebaseApp);
    
    async function logoff(){
        try{
            await signOut(auth);
            navigation.navigate('Login');
        }catch(err){
            console.log(err);
        }
    }

    return(
        <View style={{flexGrow:1, alignItems:'center', justifyContent:'center', backgroundColor:'#222222'}}>
            <Text style={{fontSize:25, marginVertical:10, color:'#fff'}}>Hugo de Oliveira Pinho</Text>

            <TouchableOpacity style={{width:'80%'}} onPress={()=>logoff()}>
                <Text style={estiloPerfil.btt}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}