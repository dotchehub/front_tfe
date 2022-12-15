import React from 'react';
import MapView from 'react-native-maps';
import { Marker,Callout  } from 'react-native-maps';

import { StyleSheet, View,Button,Text } from 'react-native';

const MapScreen = ()=> {
  return (
    <View style={styles.container}>

      <MapView style={styles.map}
      initialRegion={{
      latitude: 51.017610,
      longitude: 4.125140,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }}>
        <Marker
          coordinate={{
            latitude: 51.017610,
            longitude: 4.125140,
          }}
          >
          <Callout>
            <Text>Moi</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
