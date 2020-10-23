import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, ActivityIndicator } from 'react-native';
import debounce from 'lodash.debounce';

import HamburgerMenu from './Component/HamburgerMenu';
import mockData from '../Resources/MOCK_DATA-2.json';
import ListCell from './Component/ListCell';
import { queryDB } from '../RealmDB';
import DetailModelScreen from './DetailModelScreen';

class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            orginalMockData: mockData,
            tableDataSource: mockData,
            isLoading: false,
            isModelVisible: false,
            selectedItem: null
        };
        this.searchData = this.searchData.bind(
            this
        );
        this.searchData = debounce(
            this.searchData,
            500
        );
    }

    componentDidMount() {
        // queryDB()
        //     .then(data => {
        //         this.setState({ orginalMockData: data, tableDataSource: data });
        //     }).catch(error => console.log(error));
    }

    searchData = (text) => {
        const query = 'name CONTAINS[c] ' + "\"" + text + "\"" + " OR locality CONTAINS[c] " + "\"" + text + "\"";
        queryDB(query)
            .then(data => {
                console.log(data)
                this.setState({ tableDataSource: data, isLoading: false });
            })
            .catch(error => {
                this.setState({ tableDataSource: null, isLoading: false });
                console.log(error);
            });
    }

    createSearchView() {
        return (
            <View
                style={styles.searchView}>
                <Image
                    style={{ flex: 0.2, height: 20, width: 20 }}
                    resizeMode="contain"
                    source={require('../Resources/search.png')}
                />
                <TextInput
                    style={{ height: 35, flex: 1, backgroundColor: 'white' }}
                    autoFocus={true}
                    clearTextOnFocus={false}
                    placeholderTextColor={'grey'}
                    placeholder={'Search here'}
                    underlineColorAndroid="transparent"
                    value={this.state.searchText}
                    onChangeText={text => {
                        if (text === '') {
                            this.setState({ searchText: text, tableDataSource: this.state.orginalMockData });
                        } else {
                            this.setState({ searchText: text, isLoading: true }, () => {
                                this.searchData(text);
                            });
                        }
                    }}
                />
            </View>
        );
    }

    createListView = () => {
        const { tableDataSource } = this.state;
        if (tableDataSource && tableDataSource.length > 0) {
            return (
                <View style={styles.mainContainer}>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={tableDataSource}
                        renderItem={({ item }) => (
                            <ListCell
                                data={item}
                                onPress={data => {
                                    this.setState({ isModelVisible: true, selectedItem: data })
                                }}
                            />
                        )}
                        keyExtractor={item => item.id}
                        cell
                    />
                </View>
            );
        } else {
            return <View style={{ flex: 1, alignItems: 'center', marginTop: 200, backgroundColor: 'white' }}><Text style={{ color: 'black' }}>No Data</Text></View>;
        }
    };

    openDetailView = () => (
        <DetailModelScreen
            data={this.state.selectedItem}
            onClose={() => this.setState({ isModelVisible: false, selectedItem: null })}
        />
    );

    render() {
        return (
            <View style={styles.container}>
                <HamburgerMenu
                    screenTitle={'List'}
                    onMenuPress={() => this.props.navigation.openDrawer()} />
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    {this.createSearchView()}
                    {this.state.isLoading && <ActivityIndicator color='black' size='large' />}
                    {this.createListView()}
                </View>
                {this.state.isModelVisible && this.openDetailView()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white'
    },
    searchView: {
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
    }
});

export default ListScreen;