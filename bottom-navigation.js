// Import necessary modules from React and React Native
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for tab icons

// Define the Home Screen
function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Home</Text>
      <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.image} />
      <Text style={styles.description}>Welcome to the Home Page!</Text>
    </View>
  );
}

// Define the Videos Screen
function VideosScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Videos</Text>
      <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.image} />
      <Text style={styles.description}>Explore our video content!</Text>
    </View>
  );
}

// Define the Settings Screen
function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.image} />
      <Text style={styles.description}>Adjust your settings here.</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

// Main component that includes the navigation container and tab navigator
function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Videos') {
              iconName = focused ? 'ios-videocam' : 'ios-videocam-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }
            // Return the icon for the current route
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Videos" component={VideosScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles for the application
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    margin: 20,
    width: 200,
    height: 200,
  },
  description: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default MyTabs;
