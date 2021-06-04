import React from 'react'
import {TouchableOpacity, Text, Alert} from 'react-native'


export default class SyncButton extends React.Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity 
            style={{backgroundColor:'#D0312D', justifyContent:'center', height:"60%", marginRight:5}} 
            onPress={()=>{Alert.alert('Synchronisation', 'Synchronisation effectuée')}}>
                <Text style={{margin:10, fontSize:16, color:'white'}}>Synchroniser</Text>
            </TouchableOpacity>
        )
    }
}