import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ActivityIndicator, TouchableHighlight, ScrollView, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker'
import SegmentedControlTab from "react-native-segmented-control-tab";
import { connect } from 'react-redux';

import { apiKeys } from '../Redux/Actions/Helper/apiKeys';
import * as actions from '../Redux/Actions';
import HamburgerMenu from './Component/HamburgerMenu';
/*
First Screen
It will have a registration form with following fields —
Name
Age
D.O.B (JS Date object)
Profession (can be Employed/Student)
Locality
Number of Guests (0-2)
Address (multiline input upto 50 characters)
With a submit button you can simply mock a submit API call with services like Beeceptor. 
Also ensure you show an alert to the user if they click back while editing the form.
*/
const LABEL_TYPE = {
    NAME: 'Name',
    AGE: "Age",
    DOB: "Dob",
    PROFESSION: "Profession",
    LOCALITY: "Locality",
    GUESTS: "Guests",
    ADDRESS: "Address"
};

class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age: 0,
            dob: null,
            profession: 'Employed',
            locality: null,
            no_of_guests: 0,
            address: null,
            selectedIndexProf: 0,
            selectedIndexGuest: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.registration !== this.props.registration && !this.props.registration.isLoading) {
            if (this.props.error) {
                this.createTwoButtonAlert("Registration Failed");
            } else {
                this.createTwoButtonAlert("Registration Success");
            }
        }
    }

    validation = () => {
        for (const [key, value] of Object.entries(LABEL_TYPE)) {
            if (!this.state[value]) {
                return false;
            }
        }
        return true;
    };

    createTwoButtonAlert = (message) =>
        Alert.alert(
            "",
            message,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );

    createInputView = (labelType, isMultline = false, keyboardType = 'default') => (
        <View style={{ height: 50, marginHorizontal: 10, marginVertical: 10 }}>
            <Text style={{ height: 20, fontSize: 15 }}>{labelType}:</Text>
            <TextInput
                style={{
                    height: labelType === LABEL_TYPE.ADDRESS ? 100 : 35,
                    backgroundColor: 'white',
                    marginTop: 4,
                    borderRadius: 5,
                    padding: 10,
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
                }}
                autoFocus={true}
                keyboardType={keyboardType}
                multiline={isMultline}
                clearTextOnFocus={false}
                placeholderTextColor={'grey'}
                placeholder={`Enter ${labelType}`}
                underlineColorAndroid="transparent"
                value={this.state.searchText}
                onChangeText={text => {
                    this.setState({ [labelType]: text });
                }}
            />
        </View>
    )

    createSegementControl = (labelType) => {
        let segementData = null;
        let selectedIndex = 0;
        if (labelType === LABEL_TYPE.PROFESSION) {
            segementData = ['Employed', 'Student'];
            selectedIndex = this.state.selectedIndexProf;
        } else if (labelType === LABEL_TYPE.GUESTS) {
            segementData = ["0", "1", "2"];
            selectedIndex = this.state.selectedIndexGuest;
        }
        return (
            <View style={{ height: 50, marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ height: 20, fontSize: 15 }}>{labelType}:</Text>
                <SegmentedControlTab
                    values={segementData}
                    selectedIndex={selectedIndex}
                    onTabPress={index => {
                        this.setState({ [labelType]: segementData[index] });
                        if (labelType === LABEL_TYPE.PROFESSION) {
                            this.setState({ selectedIndexProf: index });
                        } else if (labelType === LABEL_TYPE.GUESTS) {
                            this.setState({ selectedIndexGuest: index });
                        }
                    }}
                />
            </View>
        )
    };

    createDatePicker = (labelType) => (
        <View style={{ height: 50, marginHorizontal: 10, marginVertical: 10 }}>
            <Text style={{ height: 20, fontSize: 15 }}>{labelType}:</Text>
            <DatePicker
                style={{ width: 200, backgroundColor: 'white' }}
                date={this.state[labelType]}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        backgroundColor: 'white',
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={(date) => { this.setState({ [labelType]: date }) }}
            />
        </View>
    )

    createSubmitBtn = () => (<TouchableHighlight
        onPress={() => {
            if (this.validation()) {
                this.props.fetchContent(apiKeys.registration)
            } else {
                this.createTwoButtonAlert("Incomplete informations");
            }
        }
        }
        style={styles.btn}>
        <Text
            style={{ fontSize: 14, marginTop: 5, color: 'white' }}>
            Submit
            </Text>
    </TouchableHighlight>);

    render() {
        return (
            <KeyboardAvoidingView
                behavior={'height'}
                style={styles.container}
            // keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
            >
                <HamburgerMenu
                    screenTitle={'Registration'}
                    onMenuPress={() => this.props.navigation.openDrawer()} />
                <ScrollView>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        {this.createInputView(LABEL_TYPE.NAME)}
                        {this.createInputView(LABEL_TYPE.AGE, false, 'numeric')}
                        {this.createDatePicker(LABEL_TYPE.DOB)}
                        {this.createSegementControl(LABEL_TYPE.PROFESSION)}
                        {this.createInputView(LABEL_TYPE.LOCALITY)}
                        {this.createSegementControl(LABEL_TYPE.GUESTS)}
                        {this.createInputView(LABEL_TYPE.ADDRESS, true)}
                        {this.props.registration.isLoading && <ActivityIndicator color='black' size='large' />}
                        {this.createSubmitBtn()}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    btn: {
        height: 40,
        marginHorizontal: 10,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});

function mapStateToProps(state) {
    return {
        registration: state.registration,
    };
}

export default connect(
    mapStateToProps,
    actions,
)(RegistrationScreen);