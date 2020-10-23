import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";

const DetailModelScreen = ({ data, onClose }) => {

    const detailsContainer = () => (
        <View style={styles.modalView}>
            <View style={{
                flex: 1,
                padding: 5,
                justifyContent: 'flex-start'

            }}>
                <Text style={{ fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Name:
                    </Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>
                    {data.name}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Locality:
                    </Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>
                    {data.locality}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    DOB:
                    </Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>
                    {data.dob}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    AGE:
                    </Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>
                    {data.age}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Number of Guests:
                    </Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>
                    {data.no_of_guests}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Profession:
                    </Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>
                    {data.profession}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 5, fontWeight: 'bold' }}>
                    Address:
                    </Text>
                <Text style={{ fontSize: 14, marginTop: 5 }}>
                    {data.address}
                </Text>
            </View>
        </View>
    )
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                            onClose();
                        }}
                    >
                        <Text style={styles.textStyle}>X</Text>
                    </TouchableHighlight>
                    {detailsContainer()}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: 44,
        backgroundColor: 'white'
    },
    modalView: {
        marginHorizontal: 15,
        // marginBottom: 50,
        marginTop: 5,
        flex: 0.45,
        backgroundColor: "white",
        borderRadius: 20,
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
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginLeft: 15,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default DetailModelScreen;
