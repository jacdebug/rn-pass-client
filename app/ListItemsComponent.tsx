import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import {HeaderWithLogo} from './HeaderWithLogo';
import {ItemType} from './types';

export const ListItemsComponent = ({
  list,
  onSelect,
}: {
  list: ItemType[];
  onSelect: (item: ItemType) => void;
}) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <HeaderWithLogo />
        <FlatList
          data={list}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                onSelect(item);
              }}
              style={stylesListSites.sites}>
              <Text>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const stylesListSites = StyleSheet.create({
  scrollView: {
    height: 500,
  },
  sites: {
    backgroundColor: '#ddd',
    padding: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 64,
    borderWidth: 1,
  },
});
