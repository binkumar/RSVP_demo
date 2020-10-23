import 'react-native';
import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import RegistrationScreen from '../../app/Eduvanz/RegistrationScreen';

const mockStore = configureStore();

const navigation = {
  dispatch: jest.fn(),
};

const mockState = { registration: {} };

describe('RegistrationScreen', () => {
  it('renders correctly ', () => {
    const store = mockStore(mockState);
    const tree = renderer.create(
      <Provider store={store}>
        <RegistrationScreen navigation={navigation} />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
