import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import estiloRegistro from '../../styles/estiloRegistro';
import { Picker } from '@react-native-picker/picker';

import {useRoute, useNavigation} from '@react-navigation/native';

import firebaseApp from '../../firebase/firebaseConnect';
import {getDatabase, ref, push, get, update} from 'firebase/database';

export default function Registro(){
    const route = useRoute();
    const navigation = useNavigation();

    const [valor, setValor] = useState();
    const [type, setType] = useState('receita');

    const database = getDatabase(firebaseApp, 'https://myappfinancas-default-rtdb.firebaseio.com/');

    const refRegistros = ref(database, `/usuarios/${route.params?.idUsuario}/registros`);
    const refSaldo = ref(database, `/usuarios/${route.params?.idUsuario}/saldo`);
    const refUser = ref(database, `/usuarios/${route.params?.idUsuario}`);

    async function atualizaSaldo(){
        try{
            let novoSaldo = 0;
            const response1 = await get(refSaldo);
            const saldoAtual = Number(response1.val())

            if(type == 'receita'){
                novoSaldo = saldoAtual + Number(valor);
            }else{
                novoSaldo = saldoAtual - Number(valor);
            }

            const response2 = await update(refUser, {
                saldo:novoSaldo
            });
        }catch(err){
            console.log(err);
        }
    }

    async function adicionaKey(key){
        const refRegistro = ref(database, `/usuarios/${route.params?.idUsuario}/registros/${key}`);
        try{
            await update(refRegistro, {
                id:key
            })
            console.log(key);
        }catch(err){
            console.log(err);
        }
    }

    function registrar(valorPassado, typePassado){
        const response = push(refRegistros, {
            type:typePassado,
            valor:valorPassado
        })
        setValor('');
        atualizaSaldo();
        adicionaKey(response.key);
        navigation.navigate('Home');
    }

    return(
        <View style={estiloRegistro.containerPrincipal}>
            <TextInput value={valor} onChangeText={(txt)=>setValor(txt)} style={estiloRegistro.txtInput} placeholder={'Valor'} placeholderTextColor={'#ccc'} keyboardType={'decimal-pad'}></TextInput>
            <Picker selectedValue={type} onValueChange={(vl)=>{setType(vl)}} style={{width:'80%', backgroundColor:'#000', color:'#fff'}} dropdownIconColor={'#ccc'}>
                <Picker.Item label='RECEITA' value={'receita'}/>
                <Picker.Item label='DESPESA' value={'despesa'}/>
            </Picker>

            <TouchableOpacity style={{width:'80%'}} onPress={()=>registrar(valor, type)}>
                <Text style={estiloRegistro.btt}>Registrar</Text>
            </TouchableOpacity>
        </View>
    )
}