import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView, //Only for ios
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import { icons, COLORS, SIZES, FONTS } from '../constants';

export default function Restaurrant({ route, navigation }) {

  //Take data from Homescreens naviagtion
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    let {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, []);

  const renderHeader = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding *2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30
            }}
          />
        </TouchableOpacity>

        {/* Restaurant name section */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding *3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray
            }}
          >

            <Text style={{ ...FONTS.h4 }}>{restaurant?.name}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding*2,
            justifyContent:'center'
          }}
        >
          <Image
            source={icons.list}
            resizeMode= 'contain'
            style={{
              width: 30,
              height: 30
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container, styles.screen}>
      {renderHeader()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2
  },
  screen: {
    paddingTop: 30
  }
})

