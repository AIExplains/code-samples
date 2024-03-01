import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Easing, withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const AnimatedComponent = () => {
  // Shared values for animations
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const translateX = useSharedValue(-100);

  useEffect(() => {
    try {
      // Starting the animations when the component mounts
      opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
      scale.value = withTiming(1, { duration: 1000, easing: Easing.elastic(2) });
      translateX.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });
    } catch (error) {
      console.error("Animation error:", error);
    }
  }, []);

  // Animated styles
  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const slideInStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Fade In Animation */}
      <Animated.View style={[styles.box, fadeInStyle]}>
        <Text>Fade In</Text>
      </Animated.View>

      {/* Scale Animation */}
      <Animated.View style={[styles.box, scaleStyle]}>
        <Text>Scale</Text>
      </Animated.View>

      {/* Slide In Animation */}
      <Animated.View style={[styles.box, slideInStyle]}>
        <Text>Slide In</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#61dafb',
  },
});

export default AnimatedComponent;
