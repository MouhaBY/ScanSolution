import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import {detailsInventaires} from '../Helpers/data'

export default class InventoryDetails extends React.Component {
    constructor(props){
        super(props)
        this.state={
            inventory_token: '',
            inventorylist:[]
        }
    }

    get_inventory_details(id_inv){
        const newData = detailsInventaires.filter((item) => item.inventory_id === id_inv)
        return(newData)
    }

    componentDidMount(){
        const { navigation, route } = this.props;
        const inventory_token_const = route.params.inventory_token
        this.setState({inventory_token: inventory_token_const})
        const inventory_token_const_id = route.params.inventory_token.id.toString()
        const inventorylist_const = this.get_inventory_details(inventory_token_const_id)
        this.setState({inventorylist: inventorylist_const})
      }

    render(){
        return(
            <View>
                <TouchableOpacity style={styles.top_container} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.title_container}>{"Détails de l'inventaire : " + this.state.inventory_token.name}</Text>
                    <Text style={{color:'white'}}>{"Id de l'inventaire " + this.state.inventory_token.id + " | Date du "+ this.state.inventory_token.date}</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.inventorylist}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                    <View>
                        <Text>{item.location}</Text>
                        <Text>{item.barcode}</Text>
                        <Text>{item.quantity}</Text>
                    </View>
                    )}>
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    top_container:{
        backgroundColor:'#2196F3', 
        justifyContent:'center', 
        alignItems:'center', 
        height:70
    },
    title_container:{
        fontWeight:'bold',
        color:'white',
        fontSize:20
    },
})