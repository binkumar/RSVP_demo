import {Dimensions, Platform} from 'react-native';

export const isIOSDeviceWithNotch = () => {
  const dimensions = Dimensions.get('window');
  const {height, width} = dimensions;

  return Platform.OS === 'ios' && (height > 800 || width > 800);
};

export const statusBarHeight = () => {
  if (Platform.OS === 'android') {
    return 0;
  } else if (isIOSDeviceWithNotch()) {
    return 35;
  }
  return 20;
};
