import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { Home, Restaurrant, OrderDelivery } from './screens';
import { StyleSheet, Text, View, Image } from 'react-native';

// Load Font, (important)
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
  // Load Font, (important)
  const [loaded] = useFonts({
    "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
  })
  
  if(!loaded){
    return null;
  }
  // ======================
  
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Home" component={Tabs}/>
        <Stack.Screen name="Restaurant" component={Restaurrant}/>
        <Stack.Screen name="OrderDelivery" component={OrderDelivery}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>hi</Text>
    //   <Image source={icons.cutlery} style={{
    //             width: 25,
    //             height: 25,
    //             tintColor: COLORS.primary
    //           }}/>
    // </View>
  );
}

const styles = StyleSheet.create({
  screen: {
   paddingTop: 30
  },
});
