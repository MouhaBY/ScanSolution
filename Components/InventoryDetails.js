import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
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
        const inventorylist_const = this.get_inventory_details(inventory_token_const.id.toString())
        this.setState({inventorylist: inventorylist_const})
      }

    _deleteRow = (item) => {
        Alert.alert('Supprimer', 'Etes vous sur de supprimer cette ligne ?', 
        [   { text: 'Annuler',},
            { text: 'Confirmer', onPress: () => {}},
        ])
    }

    _renderItem = ({item}) => (
        <TouchableOpacity 
        style={styles.table_row}
        onLongPress={this._deleteRow}>
            <Text style={[styles.table_row_txt, {width: "35%"}]}>{item.location}</Text>
            <Text style={[styles.table_row_txt, {width: "40%"}]}>{item.barcode}</Text>
            <Text style={[styles.table_row_txt, {width: "25%"}]}>{item.quantity}</Text>
        </TouchableOpacity>
        )
    
    render(){
        return(
            <View style={styles.main_container} >
                <TouchableOpacity style={styles.top_container} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.title_container}>{"Détails de l'inventaire : " + this.state.inventory_token.name}</Text>
                    <Text style={{color:'white'}}>{"Id de l'inventaire " + this.state.inventory_token.id + " | Date du "+ this.state.inventory_token.date}</Text>
                </TouchableOpacity>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <View style={styles.table_header}>
                        <Text style={[styles.table_header_txt, {width: "35%"}]}>Emplacement</Text>
                        <Text style={[styles.table_header_txt, {width: "40%"}]}>Code à barre</Text>
                        <Text style={[styles.table_header_txt, {width: "25%"}]}>Quantité</Text>
                    </View>
                    <FlatList
                        data={this.state.inventorylist}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={this._renderItem}
                        >
                    </FlatList>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex:1,
        backgroundColor:'white',
    },
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
    table_header:{
        flexDirection:'row', 
        marginTop:3, 
        backgroundColor:'#71afe5'
    },
    table_header_txt:{
        fontWeight:'bold', 
        textAlign:"center", 
        padding:5, 
        color:'white', 
        fontSize:16, 
        height:40
    },
    table_row:{
        flexDirection: "row", 
        height: 40, 
        alignItems:"center",
        justifyContent:'center',
    },
    table_row_txt:{
        padding:5, 
        height:35,
        textAlign:"center",
        fontSize:14, 
        backgroundColor:'#eff6fc',
    },    
})