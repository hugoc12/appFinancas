import {StyleSheet} from 'react-native';

const estiloRegistro = StyleSheet.create({
    containerPrincipal:{
        flexGrow:1, 
        alignItems:'center', 
        justifyContent:'flex-start', 
        backgroundColor:'#222222',
        paddingTop:20
    },

    txtInput:{
        width: '80%',
        padding: 10,
        backgroundColor:'#000',
        borderRadius:5,
        fontSize:18,
        color: '#fff',
        marginVertical:5
    },

    btt:{
        textAlign:'center',
        padding: 10,
        backgroundColor:'#00b94a',
        color: '#000',
        marginTop:20,
    }
})

export default estiloRegistro;