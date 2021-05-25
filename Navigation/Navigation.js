import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import {NavigationContainer} from "@react-navigation/native"

import LoginForm from '../Components/LoginForm'
import Home from '../Components/Home'
import InventoriesMenu from '../Components/InventoriesMenu'
import InventoriesDetailsMenu from '../Components/InventoriesDetailsMenu'
import InventorierForm from '../Components/InventorierForm'
import InventoryDetails from '../Components/InventoryDetails'

import { connect } from 'react-redux'
import store from '../Store/configureStore'


const Stack = createStackNavigator()

const SearchNavigation = () => {    
    const state = store.getState()
    const authenticated = state.authenticated

    if (authenticated) {
        return(
            <NavigationContainer>             
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="Inventaires" component={InventoriesMenu}/>
                    <Stack.Screen name="Détails Inventaires" component={InventoriesDetailsMenu}/>
                    <Stack.Screen name="Inventorier" component={InventorierForm}/>
                    <Stack.Screen name="Détails" component={InventoryDetails}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
                    }
    else {
        return(
            <NavigationContainer>             
                <Stack.Navigator>
                    <Stack.Screen name="Connexion" component={LoginForm}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
      authenticated: state.authenticated
    }
  }
  
  export default connect(mapStateToProps)(SearchNavigation)