import React from 'react'
import {View, Text, StyleSheet, Button, Image, TextInput} from 'react-native'

export default class LoginForm extends React.Component 
{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }
    
    Login() {
        console.log(this.state.username)
        console.log(this.state.password)
    }

    render(){
        return(
            <View style={styles.container}>
                
                <Text>Login Form</Text>
                <TextInput value={this.state.username} onChangeText={(username) => this.setState({ username })} style={styles.inputContainer} placeholder='username'/>
                <TextInput value={this.state.password} onChangeText={(password) => this.setState({ password })} style={styles.inputContainer} placeholder='Password' secureTextEntry={true}/>
                <Button title={'Login'} style={styles.buttonContainer} onPress={() => this.Login()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00FFFF',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        width: 200,
        height: 44,
    },
    image:{
        width: 70,
        height: 80,
        margin: 20,
        resizeMode: 'stretch',
    }

  })