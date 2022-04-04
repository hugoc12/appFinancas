import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';

import {useRoute} from '@react-navigation/native';

import CardDespesa from '../../components/cardDespesa';
import CardReceita from '../../components/cardReceita';

import firebaseApp from '../../firebase/firebaseConnect';
import {ref, getDatabase, get, onValue} from 'firebase/database';



export default function Home(props){
    const route = useRoute();
    const database = getDatabase(firebaseApp, 'https://myappfinancas-default-rtdb.firebaseio.com/');
    
    const refNome = ref(database, `/usuarios/${route.params?.idUsuario}/nome`);
    const refRegistros = ref(database, `/usuarios/${route.params?.idUsuario}/registros`);
    const refSaldo = ref(database, `usuarios/${route.params?.idUsuario}/saldo`);

    const [registros, setRegistros] = useState([]);
    const [saldoAtual, setSaldo] = useState(0);
    const [nome, setNome] = useState('');

    useEffect(()=>{
        onValue(refRegistros,()=>buscarRegistros());
        onValue(refSaldo, ()=>buscaSaldo());

        async function buscarRegistros(){
            try{
                const response = await get(refRegistros);
                const arrayValues = Object.keys(response.val()).map((key)=>response.val()[key])
                setRegistros(arrayValues.reverse());
            }catch(err){
                console.log(`Não há registros - ${err}`)
                setRegistros(false);
            }
        }

        async function buscaSaldo(){
            try{
                const response = await get(refSaldo);
                setSaldo(response.val());
            }catch(err){
                console.log(err)
            }
        }

        async function buscaNome(){
            try{
                const response = await get(refNome);
                setNome(response.val());
            }catch(err){
                console.log(err);
            }
        }

        buscarRegistros();
        buscaSaldo();
        buscaNome();
    }, [])
    
    return(
        <View style={{flexGrow:1, alignItems:'center', justifyContent:'center', backgroundColor:'#222222', padding:10}}>
            <Text style={{alignSelf:'flex-start', color:'#fff', fontSize:25, fontStyle:'italic', marginTop:30}}>{nome}</Text>
            <Text style={{alignSelf:'flex-start', color:'#fff', fontSize:35, marginVertical:15}}>R${saldoAtual.toFixed(2)}</Text>

            <View style={{width:'100%', height:400, alignItems:'center', justifyContent:'center', backgroundColor:'#fff', borderTopLeftRadius:10, borderTopRightRadius:10}}>
                {registros?
                <FlatList style={{width:'100%', backgroundColor:'#fff', borderTopLeftRadius:10, borderTopRightRadius:10}} data={registros} renderItem={({item})=>{
                    if(item.type === 'receita'){
                        return <CardReceita data={item} idUsuario={route.params?.idUsuario} database={database}/>
                    }else{
                        return <CardDespesa data={item} idUsuario={route.params?.idUsuario} database={database}/>
                    }
                }}/>:<Text style={{fontSize:20}}>Não há registros</Text>}
            </View>

        </View>
    )
}