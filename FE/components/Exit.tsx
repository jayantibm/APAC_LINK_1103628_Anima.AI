import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Exit: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Goodbye! You can exit the app now.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Exit;
