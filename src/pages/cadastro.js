import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import estiloCadastro from '../styles/estiloCadastro';

import firebaseApp from '../firebase/firebaseConnect';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, update} from 'firebase/database';

const database = getDatabase(firebaseApp, 'https://myappfinancas-default-rtdb.firebaseio.com/');
const refUsuarios = ref(database, '/usuarios');


export default function Cadastro(){
    const navigation = useNavigation();
    const auth = getAuth(firebaseApp);

    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    async function createUser(emailDigitado, senha){
        try{
            const response = await createUserWithEmailAndPassword(auth, emailDigitado, senha);
            const idUser = response.user.uid;
            update(refUsuarios, {
                [`${idUser}`]:{
                  nome:nome,
                  email:email,
                  saldo:0,  
                }
            })
            alert('Usuário criado!');
            navigation.navigate('Login');
            setNome('');
            setEmail('');
            setSenha('');
        }catch(err){
            alert(err);
        }
    }

    return(
        <View style={{flexGrow:1, alignItems:'center', justifyContent:'center', backgroundColor:'#222222'}}>
            <TextInput value={nome} onChangeText={(txt)=>setNome(txt)} placeholder={'Nome'} placeholderTextColor={'#ccc'} style={estiloCadastro.txtInput}/>
            <TextInput value={email} onChangeText={(txt)=>setEmail(txt)} placeholder={'Email'} placeholderTextColor={'#ccc'} style={estiloCadastro.txtInput}/>
            <TextInput value={senha} onChangeText={(txt)=>setSenha(txt)} placeholder={'Senha'} placeholderTextColor={'#ccc'} style={estiloCadastro.txtInput}/>
            <TouchableOpacity style={{width:'80%'}} onPress={()=>createUser(email, senha)}>
                <Text style={estiloCadastro.btt}>CADASTRAR</Text>
            </TouchableOpacity>
        </View>
    )
}