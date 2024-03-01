import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import './App.css'; // Make sure to create an appropriate CSS file for styling

// Replace YOUR_API_KEY with your actual Google Maps API key
const googleMapsApiKey = 'YOUR_API_KEY';

const containerStyle = {
  width: '600px',
  height: '400px'
};

// Fictional current location - Venice Beach, CA
const center = {
  lat: 33.9850,
  lng: -118.4695
};

const MapComponent = () => {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places']
  });

  useEffect(() => {
    if (!isLoaded) return;

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 15,
    });

    const placesService = new window.google.maps.places.PlacesService(map);

    const request = {
      location: center,
      radius: '500', // Search within 500 meters
      type: ['cafe'] // Search for cafes
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setCoffeeShops(results);
      }
    });
  }, [isLoaded]);

  // Calculate distance between two points in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <div className="hero-banner">
        <h1>Find a Coffee Shop Near You</h1>
      </div>
      <div className="content-wrapper" style={{maxWidth: '1200px'}}>
        <ul className="coffee-shops-list">
          {coffeeShops.map((shop) => (
            <li key={shop.place_id} onClick={() => setSelectedShop(shop)}>
              {shop.name} - {calculateDistance(center.lat, center.lng, shop.geometry.location.lat(), shop.geometry.location.lng())} km away
            </li>
          ))}
        </ul>
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            {coffeeShops.map((shop) => (
              <Marker key={shop.place_id} position={shop.geometry.location} onClick={() => setSelectedShop(shop)} />
            ))}
            {selectedShop && (
              <InfoWindow position={selectedShop.geometry.location} onCloseClick={() => setSelectedShop(null)}>
                <div>
                  <h2>{selectedShop.name}</h2>
                  <p>{selectedShop.vicinity}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
