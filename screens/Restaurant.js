import { FontDisplay } from 'expo-font';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView, //Only for ios
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { cloneElement } from 'react/cjs/react.production.min';
import { icons, COLORS, SIZES, FONTS } from '../constants';

export default function Restaurrant({ route, navigation }) {

  const scrollX = new Animated.Value(0);
  //Take data from Homescreens naviagtion
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([])

  useEffect(() => {
    let {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, []);

  // Button plus, minus
  const editOrder = (action, menuId, price) => {
    let orderList = orderItems.slice();
    let item = orderItems.filter(a => a.menuId == menuId);
    if(action == '+') {
      if(item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price
      } else {
        const newItem = {
          menuId,
          qty: 1,
          price,
          total: price
        }
        orderList.push(newItem);
      }

      setOrderItems(orderList);
    }else {
      if(item.length > 0) {
        let newQty = item[0].qty - 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price
      }

      setOrderItems(orderList)
    }
  }
  const getOrderQty = (menuId) => {
    let orderItem = orderItems.filter(a => a.menuId == menuId);

    if(orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  }

  const getBusketItemCount = () => {
    const itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  }

  const sumOrder = () => {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total.toFixed(2);
  }
 
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
        onScroll={Animated.event([
          {nativeEvent: { contentOffset: {x: scrollX} } }
        ], {
          useNativeDriver: false
        })}
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
                      onPress={() => editOrder('-', item.menuId, item.price)}
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
                      <Text style={{...FONTS.h2}}>{getOrderQty(item.menuId)}</Text>
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
                      onPress={() => editOrder('+', item.menuId, item.price)}
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

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width)
    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding
          }}
        >
          {
            restaurant?.menu.map((item, index) => {
              const opacity = dotPosition.interpolate({
                inputRange: [index-1, index, index+1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              })

              const dotSize = dotPosition.interpolate({
                inputRange: [index-1, index, index+1],
                outputRange: [SIZES.base * 0.8, SIZES.base, SIZES.base * 0.8],
                extrapolate: 'clamp'
              })

              const dotColor = dotPosition.interpolate({
                inputRange: [index-1, index, index+1],
                outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                extrapolate: 'clamp'
              })
              return (
                <Animated.View
                  key={`dot-${index}`}
                  opacity={opacity}
                  style={{
                    borderRadius: SIZES.radius,
                    marginHorizontal: 6,
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: dotColor
                  }}
                />
              )
            })
          }
        </View>
      </View>
    )
  }

  const renderOrder = () => {
    return(
      <View>
        {
          renderDots()
        }
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding*2,
              paddingHorizontal: SIZES.padding*3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1
            }}
          >
            <Text style={{...FONTS.h3}}> {getBusketItemCount()} Item in cart</Text>
            <Text style={{...FONTS.h3}} >{sumOrder()}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding*2,
              paddingHorizontal: SIZES.padding*3,

            }}
          >
            <View
              style={{flexDirection: 'row'}}
            >
              <Image
                source={icons.pin}
                resizeMode='contain'
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray
                }}
              />
              <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>LOCATION</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Image
                  source={icons.master_card}
                  resizeMode='contain'
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.darkgray
                  }}
                />
                <Text style={{marginLeft: SIZES.padding, ...FONTS.h4}}>555</Text>
            </View>
          </View>
        
          {/* Order Button  */}
          <View
            style={{
              padding: SIZES.padding*2,
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <TouchableOpacity
              style={{
                width: SIZES.width *0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems:'center',
                borderRadius: SIZES.radius
              }}
              onPress={() => navigation.navigate("OrderDelivery", {
                restaurant,
                currentLocation
              })}
            >
              <Text style={{color: COLORS.white, ...FONTS.h2}}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container, styles.screen}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
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

