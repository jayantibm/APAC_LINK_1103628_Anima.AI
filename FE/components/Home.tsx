import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NexusSearch from './nexusSearch';

const Home: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome to the Nexus Search Engine!!</Text>
    <NexusSearch />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:'20%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft:30,
    alignItems: 'center',
  },
});

export default Home;
