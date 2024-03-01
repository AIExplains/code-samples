import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const MyAnimatedComponent = () => {
  // FadeIn Animation for introductory text or elements
  const fadeInAnimation = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  // SlideInLeft Animation for menu or information panels entering the screen
  const slideInLeftAnimation = {
    from: {
      translateX: -100,
    },
    to: {
      translateX: 0,
    },
  };

  // Pulse Animation for notification icons or buttons to draw attention
  const pulseAnimation = {
    0: {
      scale: 1,
    },
    0.5: {
      scale: 1.1,
    },
    1: {
      scale: 1,
    },
  };

  // Wrapper function for executing animations with error handling
  const animateWithTryCatch = async (ref, animation) => {
    try {
      await ref.animate(animation);
    } catch (error) {
      console.error('Animation error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* FadeIn Animation Example */}
      <Animatable.Text
        animation={fadeInAnimation}
        duration={1000}
        style={styles.text}
      >
        Fade In Animation
      </Animatable.Text>

      {/* SlideInLeft Animation Example */}
      <Animatable.View
        animation={slideInLeftAnimation}
        duration={1000}
        style={styles.box}
      >
        <Text>Slide In Animation</Text>
      </Animatable.View>

      {/* Pulse Animation Example */}
      <TouchableOpacity onPress={() => {}}>
        <Animatable.View
          animation={pulseAnimation}
          duration={1000}
          iterationCount="infinite"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Pulse Animation</Text>
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'tomato',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MyAnimatedComponent;
