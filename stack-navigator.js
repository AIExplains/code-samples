import React from 'react';
import { Button, Text, View, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Import Reanimated and its helpers
import { withTiming, Easing } from 'react-native-reanimated';

// Define your Stack Navigator
const Stack = createStackNavigator();

// Custom animation configuration
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

// Define a generic Screen component
const Screen = ({ navigation, title }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{title}</Text>
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
);

// Home Screen component
const HomeScreen = ({ navigation }) => <Screen navigation={navigation} title="Home" />;

// Videos Screen component
const VideosScreen = ({ navigation }) => <Screen navigation={navigation} title="Videos" />;

// Watch Screen component
const WatchScreen = ({ navigation }) => <Screen navigation={navigation} title="Watch" />;

// Main Navigator component
const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: config,
        },
        headerLeft: () => (
          <Button
            onPress={() => {}} // Implement navigation.goBack or your custom logic
            title="Back"
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Videos" component={VideosScreen} />
      <Stack.Screen name="Watch" component={WatchScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
