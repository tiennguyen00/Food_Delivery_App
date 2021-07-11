import { CardAnimationContext } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions, //Lay gia tri mac dinh cua thiet bi
  Image
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { COLORS, GOOGLE_API_KEY, icons } from '../constants';

const height = Dimensions.get('window').height;
export default function OrderDelivery({route, navigation}) {
  const [restaurant1, setRestaurant1] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    let {restaurant, currentLocation} = route.params;
    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude)/2,
      longitude: (fromLoc.longitude + toLoc.longitude)/2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude)*2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude)*2,
    }

    setRestaurant1(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  const renderMap = () => {
    const destinationMarker = () => {
     return(
      <Marker
        coordinate={toLocation}
      >
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white 
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary
            }}
          >
            <Image
              source={icons.pin}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white
              }}
            />
          </View>
        </View>
      </Marker>
    )
    }

    const carIcon = () => {
      return (
        <Marker
          coordinate={fromLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          flat={true}
          //rolation
        >
          <Image 
            source={icons.car}
            style={{
              width: 40,
              height: 40
            }}
          />
        </Marker>
      )
    }

    return(
     <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
        >
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
          />
          {destinationMarker()}
          {carIcon()}
        </MapView>
     </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {renderMap()}
    </View>
  )
}

