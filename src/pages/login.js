import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import estiloLogin from '../styles/estiloLogin';
import firebaseApp from '../firebase/firebaseConnect';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

export default function Login(){
    const navigation = useNavigation();
    const auth = getAuth(firebaseApp);
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    async function signUser(email, senha){
        try{
            const response = await signInWithEmailAndPassword(auth, email, senha);
            navigation.navigate('Dashboard', {
                idUser:response.user.uid
            });

            setEmail('');
            setSenha('');
        }catch(err){
            alert(err);
        }
    }

    return(
        <View style={{flexGrow:1, alignItems:'center', justifyContent:'center', backgroundColor:'#222222'}}>
            <Image source={require('../imgs/Logo.png')} style={{marginBottom:40}}/>
            
            <TextInput value={email} onChangeText={(txt)=>setEmail(txt)} placeholder='Email' placeholderTextColor={'#ccc'} style={estiloLogin.txtInput}/>
            <TextInput value={senha} onChangeText={(txt)=>setSenha(txt)} placeholder='Senha' placeholderTextColor={'#ccc'} style={estiloLogin.txtInput} secureTextEntry={true}/>

            <TouchableOpacity style={{width:'80%'}} onPress={()=>signUser(email, senha)}>
                <Text style={estiloLogin.btt}>ACESSAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:20}} onPress={()=>navigation.navigate('Cadastro')}>
                <Text style={{color:'#fff'}}>Criar conta gratuita</Text>
            </TouchableOpacity>
        </View>
    )
}