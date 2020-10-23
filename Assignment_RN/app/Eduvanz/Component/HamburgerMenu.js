import React from 'react';
import { Text } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HamburgerMenu({ screenTitle, onMenuPress }) {
    return (
        <Header
            centerComponent={<Text style={{ color: 'white', fontSize: 16 }}>{screenTitle}</Text>}
            leftComponent={<Icon name='align-justify' color='white' size={30} onPress={() => onMenuPress()} />}
        />
    );
}