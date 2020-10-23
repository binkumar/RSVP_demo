import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';

export default function ListCell({ data, onPress }) {
  return (
    <TouchableHighlight onPress={() => onPress(data)} style={styles.container}>
      <View style={{
        flex: 1,
        padding: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center'

      }}>
        <View style={{
          flex: 1,
          padding: 5,
        }}>
          <Text style={{ flex: 0.6, fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
            Name
        </Text>
          <Text style={{ flex: 0.6, fontSize: 16, marginTop: 5 }}>
            {data.name}
          </Text>
        </View>
        <View style={{
          flex: 1,
          padding: 5

        }}>
          <Text style={{ flex: 0.6, fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
            Locality
        </Text>
          <Text style={{ flex: 0.6, fontSize: 16, marginTop: 5 }}>
            {data.locality}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    // backgroundColor: 'white',
    // borderColor: 'grey',
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});
