import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {inventaires} from '../Helpers/data'


class InventoriesDetails extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {}
    }

    accessInventoryDetails = (item) => {
       this.props.navigation.navigate("Détails", {inventory_token:item})
      }
    
    render(){
        return(
            <View style={styles.mainContainer}>
                <Text style={styles.textContainer}>Choix d'inventaire à consulter</Text>
                <FlatList 
                    style= {styles.mainList}
                    data={inventaires}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                    <TouchableOpacity
                    onPress = {() => this.accessInventoryDetails(item)} 
                    style={styles.mainInventory}>
                        <Text style={{fontWeight:'bold', color:'#005a9e'}}>{item.name + " "}</Text>
                        <Text style={{color:'#005a9e'}}>{"Date " + item.date}</Text>
                    </TouchableOpacity>
                )}>
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        mainContainer:{
            flex:1,
        },
        mainList:{
            flex:1,
        },
        textContainer:{
            justifyContent:'center',
            alignItems:'center',
            fontWeight:'bold',
            fontSize:20,
            margin:15,
        },
        mainInventory:{
            height: 65,
            padding:10,
            borderColor:'white',
            borderWidth: 1,
            borderRadius: 5,
            margin: 5,
            backgroundColor: "#deecf9"
        },
    }
)

export default InventoriesDetails