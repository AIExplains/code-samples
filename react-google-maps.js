import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from 'your-google-maps-api-key'; // Replace with your actual Google Maps API key

const VeniceBeachCoffeeFinder = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coffeeShops, setCoffeeShops] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchCoffeeShops(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchCoffeeShops = async (lat, long) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=cafe&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      setCoffeeShops(data.results);
    } catch (error) {
      console.error('Error fetching coffee shops:', error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d.toFixed(2);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroBanner}>
        <Image
          source={require('./path/to/your/backgroundImage.jpg')}
          style={styles.heroBannerImage}
        />
        <Text style={styles.heroBannerTitle}>Find a Coffee Shops Near You</Text>
      </View>
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Your Location"
            />
            {coffeeShops.map((shop, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: shop.geometry.location.lat,
                  longitude: shop.geometry.location.lng,
                }}
                title={shop.name}
              />
            ))}
          </MapView>
        )}
      </View>
      <View style={styles.coffeeShopList}>
        <Text style={styles.coffeeShopListTitle}>Nearby Coffee Shops</Text>
        <View style={styles.tableContainer}>
          {coffeeShops.map((shop, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <Text>{calculateDistance(location.latitude, location.longitude, shop.geometry.location.lat, shop.geometry.location.lng)} km</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroBanner: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroBannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coffeeShopList: {
    padding: 20,
  },
  coffeeShopListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    flexDirection: 'column',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  shopName: {
    fontWeight: 'bold',
  },
});

export default VeniceBeachCoffeeFinder;
