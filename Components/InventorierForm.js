import React from 'react'
import { Text, View, StyleSheet, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'


class InventorierForm extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            location:'',
            barcode:'',
            quantity:'1',
            inventory_token:'',
            isFormValid:false,
            inventoryRows:[],
            withQuantity:false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.location !== prevState.location || this.state.barcode !== prevState.barcode) {
          this.validateForm()
      }
    }

    validateForm = () => {
        if (this.state.location !== "" && this.state.barcode !== "") {
            this.setState({isFormValid: true})
        }
        else
            this.setState({isFormValid: false})
    }

    componentDidMount(){
        //const { navigation, route } = this.props;
        const inventory_token_const = this.props.route.params.inventory_token
        this.setState({inventory_token: inventory_token_const})
    }

    _submit() {
        this.state.inventoryRows.push()
        console.log(this.state.inventoryRows)
        this.setState({barcode:''})
        this.setState({quantity:'1'})
    }

    accessInventoryDetails = (item) => {
        this.props.navigation.navigate("Détails", {inventory_token:item})
       }

    render(){        
        return(
            <View style={{flex:1,}}>
                <TouchableOpacity style={styles.top_container} onPress = {() => this.accessInventoryDetails(this.state.inventory_token)} >
                    <Text style={styles.title_container}>{"Inventaire en cours : " + this.state.inventory_token.name}</Text>
                    <Text style={{color:'white'}}>{"Id de l'inventaire " + this.state.inventory_token.id + " | Date du "+ this.state.inventory_token.date}</Text>
                </TouchableOpacity>
                <View style={styles.checkbox_container}>
                    <Text>{this.state.withQuantity ? "Inventaire quantitatif" : "Inventaire unitaire"}</Text>
                    <CheckBox style={{margin:5}} value={this.state.withQuantity} onValueChange={(withQuantity) => this.setState({ withQuantity })} />
                </View>
                <View style={styles.main_container}>
                        <Text style={styles.text_container}>Code emplacement</Text>
                        <TextInput
                        value={this.state.location} 
                        onChangeText={(location) => this.setState({ location })} 
                        style={styles.input_container} 
                        //autoFocus={true}
                        placeholder= "Emplacement"
                        blurOnSubmit={false}
                        onSubmitEditing={() => { this.secondTextInput.focus() }}/>
                        <Text style={styles.text_container}>Code article</Text>
                        <TextInput
                        value={this.state.barcode} 
                        ref={(input) => { this.secondTextInput = input }}
                        onChangeText={(barcode) => this.setState({ barcode })} 
                        style={styles.input_container} 
                        blurOnSubmit={false}
                        placeholder= "Code à barre"
                        onSubmitEditing={() => {if (this.state.withQuantity){this.thirdTextInput.focus()}else{this._submit()}}}/>
                        {this.state.withQuantity &&
                        <View style={{alignItems:'center',}}>
                            <Text style={styles.text_container}>Quantité</Text>
                            <TextInput
                                value={this.state.quantity} 
                                keyboardType="numeric"
                                ref={(input) => { this.thirdTextInput = input }}
                                onChangeText={(quantity) => this.setState({ quantity })} 
                                style={styles.input_container} 
                                placeholder= "Quantité"
                                blurOnSubmit={false}
                                onSubmitEditing={() => {
                                    this._submit()
                                    this.secondTextInput.focus()}}
                            />
                        </View>
                        }
                        <Button 
                        title='                                   submit                                   '
                        disabled={!this.state.isFormValid}
                        onPress={() => {
                            this._submit()
                            this.secondTextInput.focus()}
                                }
                        autoFocus={true}/>
                </View>
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
    checkbox_container:{
        height:20,
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'flex-end', 
        margin:10
    },
    main_container:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    input_container:{
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        marginBottom: 15,
        width: 350,
        height: 55,
    },
    title_container:{
        fontWeight:'bold',
        color:'white',
        fontSize:20
    },
    text_container:{
        margin:5,
        fontWeight:'bold',
    }
})

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        user_token: state.user_token,
    }
  }

export default connect(mapStateToProps)(InventorierForm)