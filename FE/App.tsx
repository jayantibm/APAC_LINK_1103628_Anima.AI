import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MenuBar from './components/MenuBar';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* <Appbar.Header>
          <Appbar.Content title="Menu Example" />
        </Appbar.Header> */}
        <MenuBar />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
});

export default App;
