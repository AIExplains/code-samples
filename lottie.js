import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

export default class LottieAnimationExample extends React.Component {
  // Function to play animation
  playAnimation = (animationRef) => {
    if (this[animationRef]) {
      this[animationRef].play();
    }
  };

  // Function to stop animation
  stopAnimation = (animationRef) => {
    if (this[animationRef]) {
      this[animationRef].reset();
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Animation 1: Loading Animation */}
        <Text>Loading Animation</Text>
        <LottieView
          ref={animation => {
            this.animation1 = animation;
          }}
          source={require('./animations/loading.json')} // Replace './animations/loading.json' with the path to your animation file
          loop={true}
          onAnimationFinish={() => {
            console.log('Animation Finished!');
          }}
        />
        <TouchableOpacity onPress={() => this.playAnimation('animation1')}>
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.stopAnimation('animation1')}>
          <Text>Stop</Text>
        </TouchableOpacity>

        {/* Animation 2: Success Animation */}
        <Text>Success Animation</Text>
        <LottieView
          ref={animation => {
            this.animation2 = animation;
          }}
          source={require('./animations/success.json')} // Replace './animations/success.json' with the path to your animation file
          loop={false}
        />
        <TouchableOpacity onPress={() => this.playAnimation('animation2')}>
          <Text>Play</Text>
        </TouchableOpacity>

        {/* Animation 3: Error Animation */}
        <Text>Error Animation</Text>
        <LottieView
          ref={animation => {
            this.animation3 = animation;
          }}
          source={require('./animations/error.json')} // Replace './animations/error.json' with the path to your animation file
          loop={false}
        />
        <TouchableOpacity onPress={() => this.playAnimation('animation3')}>
          <Text>Play</Text>
        </TouchableOpacity>

        {/* Error handling with try-catch */}
        {/*
          When loading animations or playing them, errors might occur if the animation files are not found,
          or if there's an issue with the Lottie library. It's good practice to wrap your LottieView operations
          in try-catch blocks to handle these exceptions gracefully.
        */}
      </View>
    );
  }
}
