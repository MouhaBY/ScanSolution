import React from 'react'
import { Text, View, StyleSheet, TextInput, Button, CheckBox, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import '../global'


class InventorierForm extends React.Component
{
    constructor(props){
        super(props)
        this.state = {
            location: '',
            barcode: '',
            quantity: '1',
            inventory_token: '',
            isFormValid: false,
            inventoryRows: [],
            message_barcode: '',
            message_location: '',
            withQuantity: global.withQuantity,
            withLocationVerification : global.withLocationVerification,
            withBarcodeVerification : global.withBarcodeVerification
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.withQuantity !== prevState.withQuantity){
            global.withQuantity = this.state.withQuantity
        }
        if (this.state.location !== prevState.location || this.state.barcode !== prevState.barcode) {
            this.setState({message_location: ''})
            this.setState({message_barcode: ''})
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

    _verify_barcode() {
        if (this.state.barcode > 10){ return(true) }
        else { return (false) }
    }

    _verify_location() {
        if (this.state.location > 10){ return(true) }
        else { return (false) }    
    }

    _verify_exists(){
        let to_submit = true
        if (this.state.withLocationVerification){
            if (!this._verify_location()){
                to_submit = false
                this.setState({message_location: 'Emplacement non reconnu'})
            }
        }
        if (this.state.withBarcodeVerification){
            if(!this._verify_barcode()){
                to_submit = false
                this.setState({message_barcode: 'Article non reconnu'})
            }
        }
        if (to_submit){
            this._submit()
        }
    }

    _submit() {
        const to_send = {id:global.tab_id++, location:this.state.location, barcode:this.state.barcode, quantity:this.state.quantity, inventory_id:this.state.inventory_token.id, user_id:this.props.user_token.id}
        global.tab.push(to_send)
        console.log(tab)
        this.setState({barcode: ''})
        this.setState({quantity: '1'})
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
                        <Text style={styles.error_message}>{this.state.message_location}</Text>
                        <Text style={styles.text_container}>Code article</Text>
                        <TextInput
                        value={this.state.barcode} 
                        ref={(input) => { this.secondTextInput = input }}
                        onChangeText={(barcode) => this.setState({ barcode })} 
                        style={styles.input_container} 
                        blurOnSubmit={false}
                        placeholder= "Code à barre"
                        onSubmitEditing={() => {
                            if (this.state.withQuantity){ this.thirdTextInput.focus() }
                            else { if (this.state.location !== "" && this.state.barcode !== "") {this._verify_exists()} }
                                        }}
                        />
                        <Text style={styles.error_message}>{this.state.message_barcode}</Text>
                        {this.state.withQuantity &&
                        <View style={{alignItems:'center', marginBottom:25}}>
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
                                    if (this.state.location !== "" && this.state.barcode !== "") {
                                        this._verify_exists()
                                        this.secondTextInput.focus()
                                    }
                                }}
                            />
                        </View>
                        }
                        <Button 
                        title='                                   submit                                   '
                        disabled={!this.state.isFormValid}
                        onPress={() => {
                            this._verify_exists()
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
        marginBottom: 2,
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
    },
    error_message:{
        color:'red', 
        marginBottom:13
    }
})

const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        user_token: state.user_token,
    }
  }

export default connect(mapStateToProps)(InventorierForm)