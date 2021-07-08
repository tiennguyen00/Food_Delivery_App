import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView, //Only for ios
  TouchableOpacity,
  Image,
  Animated,
  ColorPropType
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
  
  const renderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        //onScroll
      >
        {
          restaurant?.menu.map((item, index) => {
            return (
              <View
                key={`menu-${index}`}
                style={{ alignItems: 'center' }}
              >
                <View style={{ height: SIZES.height *0.35 }}>
                  {/* food image */}
                  <Image
                    source={item.photo}
                    resizeMode="cover"
                    style={{
                      height: "100%",
                      width: SIZES.width
                    }}
                  />

                  {/* Quantity */}
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -20,
                      width: SIZES.width,
                      height: 50,
                      justifyContent: 'center',
                      flexDirection: 'row'
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 50,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25
                      }}
                    >
                      <Text style={{...FONTS.body1}}>-</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: 50,
                        backgroundColor: COLORS.white,
                        alignItems:'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Text style={{...FONTS.h2}}>5</Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        width:50,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25
                      }}
                    >
                      <Text style={{...FONTS.body1}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Name and Description */}
                <View
                  style={{
                    width: SIZES.width,
                    alignItems: 'center',
                    marginTop: 15,
                    paddingHorizontal: SIZES.padding *2
                  }}
                >
                  <Text style={{marginVertical: 10, textAlign: 'center', ...FONTS.h2}}>{item.name} - {item.price.toFixed(2)} </Text>
                  <Text style={{...FONTS.body3, textAlign:'center'}} >{item.description}</Text>

                  {/* Categories */}
                  <View
                    style={{
                      flexDirection:'row',
                      marginTop: 10
                    }}
                  >
                    <Image
                      source={icons.fire}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 10
                      }}
                    />

                    <Text style={{...FONTS.body3, color: COLORS.darkgray}} >{item.calories.toFixed(2)} calo</Text>
                  </View>
                </View>
              </View>
            )
          })
        }
      </Animated.ScrollView>
    )
  }

  return (
    <SafeAreaView style={styles.container, styles.screen}>
      {renderHeader()}
      {renderFoodInfo()}
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

