import React from 'react'
import {View, Text, StyleSheet, Button, Image, Alert, TextInput} from 'react-native'
import { connect } from 'react-redux'
import {users} from '../Helpers/data'


class LoginForm extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            isFormValid: false,
            user_token: 'undefined'
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.username !== prevState.username || this.state.password !== prevState.password) {
          this.validateForm()
      }
    }

    validateForm = () => {
        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({isFormValid: true})
        }
        else
            this.setState({isFormValid: false})
    }

    _login() {
        const user_found = users.find(element => element.username === this.state.username)
        if (user_found){
            this.setState({user_token: user_found})
            if (this.state.password === user_found.password)
            {
                const action = { type: "LOGIN", value: user_found }
                this.props.dispatch(action)
            }
            else 
            { 
                Alert.alert('Accès interdit', 'Mot de passe erroné')
                const action = { type: "LOGOUT", value: false }
                this.props.dispatch(action)
            }}
        else
        {
            Alert.alert('Accès interdit', 'Utilisateur introuvable')
            const action = { type: "LOGOUT", value: false }
            this.props.dispatch(action)
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={require('../Images/logo.png')} style={styles.image}/>
                <Text style={styles.textcontainer}>Scan Solutions</Text>
                <TextInput 
                    value={this.state.username} 
                    onChangeText={(username) => this.setState({ username })} 
                    style={styles.inputContainer} 
                    placeholder="Nom d'utilisateur"
                    //autoFocus={true}
                    ref={(input) => { this.firstTextInput = input }}
                    //blurOnSubmit={false}
                    onSubmitEditing={() => { this.secondTextInput.focus() }}
                    />
                <TextInput 
                    value={this.state.password} 
                    onChangeText={(password) => this.setState({ password })} 
                    style={styles.inputContainer} 
                    placeholder='Mot de passe' 
                    secureTextEntry={true}
                    autoCapitalize='none'
                    ref={(input) => { this.secondTextInput = input }}
                    onSubmitEditing={() => { if (this.state.username !== "" && this.state.password !== "") {this._login()} }}
                />
                <Button 
                    title={'Se connecter'} 
                    style={styles.buttonContainer} 
                    onPress={() => this._login()} 
                    disabled={!this.state.isFormValid}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textcontainer:{
        fontWeight: "bold",
        fontSize: 24, 
        marginBottom:40, 
        color:"black",
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'grey',
        backgroundColor:'white',
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        marginBottom: 15,
        width: 300,
        height: 55,
    },
    image:{
        width: 70,
        height: 80,
        margin: 10,
        resizeMode: 'stretch',
    }
  })

  
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => { dispatch(action) }
    }
  }
  
  const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)