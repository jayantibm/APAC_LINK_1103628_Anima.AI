import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { List, Divider, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './Home';
import Exit from './Exit';

type ScreenComponent = React.FC;

const MenuBar: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenComponent>(() => Home);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu Items
  const menuItems = [
    { title: 'Home', icon: 'home', component: Home },
    { title: 'Exit', icon: 'exit-to-app', component: Exit },
  ];

  // Toggle Menu Visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Switch Screens
  const renderScreen = (Component: ScreenComponent) => {
    setCurrentScreen(() => Component);
    setIsMenuOpen(false); // Close menu
  };

  // Render Left Icons
  const renderLeftIcon = (icon: string) => (props: any) => (
    <Icon {...props} name={icon} size={24} color="#000" />
  );

  return (
    <View style={styles.container}>
      {/* Top Appbar */}
      <Appbar.Header style={styles.appbar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" size={30} color="black" />
        </TouchableOpacity>

        {/* App Title with Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>The Nexus Tactician</Text>
          <Text style={styles.appDesc}>By anima.AI</Text>
        </View>
      </Appbar.Header>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <View style={styles.menu}>
          <List.Section>
            {menuItems.map((item, index) =>
              item.subMenu ? (
                <React.Fragment key={index}>
                  <List.Accordion title={item.title} left={renderLeftIcon(item.icon)}>
                    {item.subMenu.map((subItem, subIndex) => (
                      <List.Item
                        key={`${index}-${subIndex}`}
                        title={subItem.title}
                        left={renderLeftIcon(subItem.icon)}
                        onPress={() => renderScreen(subItem.component)}
                      />
                    ))}
                  </List.Accordion>
                  <Divider />
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  <List.Item
                    title={item.title}
                    left={renderLeftIcon(item.icon)}
                    onPress={() => renderScreen(item.component)}
                  />
                  <Divider />
                </React.Fragment>
              )
            )}
          </List.Section>
        </View>
      )}

      {/* Content Area */}
      <View style={styles.content}>
        {React.createElement(currentScreen)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  appbar: { backgroundColor: '#79c2b678', flexDirection: 'row', alignItems: 'center' },
  titleContainer: { marginLeft: 10 },
  appTitle: { fontSize: 18, fontWeight: 'bold', color: 'Black' },
  appDesc: { fontSize: 12, color: 'black' },
  menu: {
    position: 'absolute',
    top: 60,
    left: 0,
    width: 220,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#ddd',
    height: '100%',
    zIndex:99
  },
  content: { flex: 1, padding: 10 },
});

export default MenuBar;
