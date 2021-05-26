import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList, CheckBox} from 'react-native'


export default class ConfigurationForm extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            withLocationVerification: false,
            withBarcodeVerification: false,
        }
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Text style={styles.textContainer}>Configuration de base</Text>
                <View style={styles.checkbox_container}>
                    <Text>{this.state.withLocationVerification ? "Vérification d'emplacement " : "Sans vérification d'emplacement "}</Text>
                    <CheckBox value={this.state.withLocationVerification} onValueChange={(withLocationVerification) => this.setState({ withLocationVerification })} />
                </View>
                <View style={styles.checkbox_container}>
                    <Text>{this.state.withBarcodeVerification ? "Vérification d'articles " : "Sans vérification d'articles "}</Text>
                    <CheckBox value={this.state.withBarcodeVerification} onValueChange={(withBarcodeVerification) => this.setState({ withBarcodeVerification })} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        mainContainer:{
            flex:1,
        },
        textContainer:{
            justifyContent:'center',
            alignItems:'center',
            fontWeight:'bold',
            fontSize:20,
            margin:15,
        },
        mainList:{
            flex:1,
        },
        checkbox_container:{
            height:20,
            flexDirection:'row',
            alignItems:'center', 
            justifyContent:'flex-end', 
            margin:10
        },
    }
)