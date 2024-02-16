// AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { auth } from './firebaseConfig'; // Import Firebase auth

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle user login
  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      Alert.alert("Success", "Logged in successfully!");
    } catch (error) {
      setError(error.message);
      Alert.alert("Error", error.message);
    }
  };

  // Handle user signup
  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      Alert.alert("Success", "Account created successfully!");
    } catch (error) {
      setError(error.message);
      Alert.alert("Error", error.message);
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (email) {
      try {
        await auth.sendPasswordResetEmail(email);
        Alert.alert("Check your email", "A password reset link has been sent to your email.");
      } catch (error) {
        setError(error.message);
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Error", "Please enter your email address.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: '80%', margin: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: '80%', margin: 10, borderWidth: 1, padding: 10 }}
      />
      <Button title={isLogin ? "Login" : "Signup"} onPress={isLogin ? handleLogin : handleSignup} />
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={{ marginTop: 20 }}>{isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePasswordReset}>
        <Text style={{ marginTop: 20 }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
