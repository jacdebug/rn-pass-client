import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

export const HeaderWithLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Text style={styles.sectionTitle}>Password Store React Native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    padding: 50,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    margin: 24,
    textAlign: 'center',
  },
  tinyLogo: {
    marginTop: 50,
    width: 30,
    height: 30,
  },
});
