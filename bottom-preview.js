import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Dimensions } from 'react-native';

const FirstRoute = () => (
  <View style={[styles.tabContainer, { backgroundColor: '#fff' }]}>
    {/* Displaying a simple table of items separated by title rows */}
    <Text style={styles.title}>Title 1</Text>
    <Text>Item 1</Text>
    <Text>Item 2</Text>
    <Text style={styles.title}>Title 2</Text>
    <Text>Item 3</Text>
    <Text>Item 4</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.tabContainer, { backgroundColor: '#fff' }]}>
    {/* Contact message form with Name, Email, and Message fields */}
    <TextInput style={styles.input} placeholder="Name" />
    <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
    <TextInput style={styles.input} placeholder="Message" multiline />
    <Button title="Submit" onPress={() => console.log('Form Submitted')} />
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const BottomSheetComponent = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Tab 1' },
    { key: 'second', title: 'Tab 2' },
  ]);

  // Render scene for tabs
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // Function to open the bottom sheet
  const handleOpenPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Handling errors with try-catch
  const safelyHandleOpenPress = async () => {
    try {
      handleOpenPress();
    } catch (error) {
      console.error('Failed to open the bottom sheet:', error);
    }
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {/* Button to open the bottom sheet */}
        <Button title="Open Bottom Sheet" onPress={safelyHandleOpenPress} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={index => console.log('handle sheet changes', index)}
        >
          {/* Tabs inside the bottom sheet */}
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={styles.tabView}
          />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 8,
  },
  tabView: {
    flex: 1,
  },
});

export default BottomSheetComponent;
