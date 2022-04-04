import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import estiloCard from '../styles/estiloCard';

import IconDown from 'react-native-vector-icons/AntDesign';
import IconDelete from 'react-native-vector-icons/AntDesign';

import {useRoute} from '@react-navigation/native';
import {ref, remove} from 'firebase/database';

export default function CardDespesa(props){
    const route = useRoute();
    const refThisCard = ref(props.database, `/usuarios/${route.params?.idUsuario}/registros/${props.data.id}`);

    async function removerRegistro(){
        try{
            const response = await remove(refThisCard);
        }catch(err){
            console.log(err);
        }
    }

    return(
        <View style={estiloCard.containerPrincipal}>
            <Text style={[estiloCard.bttTypeRegistro,{backgroundColor:'#ef463a'}]}><IconDown name='caretdown' size={20} color={'#fff'}/> DESPESA</Text>
            <Text style={{marginTop:5, fontSize:22, color:'#ef463a'}}>R${props.data.valor}</Text>
            
            <TouchableOpacity style={{position:'absolute', top:10, left:270}} onPress={()=>removerRegistro()}>
                <IconDelete name='delete' size={30} color={'#ccc'}/>
            </TouchableOpacity>
        </View>
    )
}