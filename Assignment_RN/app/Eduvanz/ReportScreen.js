import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
} from "react-native-chart-kit";

import HamburgerMenu from './Component/HamburgerMenu';
import { queryDB } from '../RealmDB';

const chartConfigAge = {
    backgroundColor: '#0091EA',
    backgroundGradientFrom: '#0091EA',
    backgroundGradientTo: '#0091EA',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
};

const chartConfigProfessionals = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
};

const chartConfigGroups = {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
};

class ReportScreen extends Component {
    /*
    Number of people in a given age range (13-18, 18-25 and 25+).
    Number of people by localities.
    Average group size of people attending the event (using guests count).
    Professionals & students count.
    */
    constructor(props) {
        super(props);
        this.state = {
            ageData: null,
            localitiesData: null,
            averageGroupData: null,
            professionalsData: null,
        };
    }

    async componentDidMount() {
        await this.updateAgeData();
        await this.updateProfessionalsData();
        await this.updateGuestsData();
    }

    updateAgeData = async () => {
        const data1 = await queryDB(`age>=13 AND age<18`);
        const data2 = await queryDB(`age>=18 AND age<25`);
        const data3 = await queryDB(`age>=25`);
        const data = {
            labels: ["Age 13-18", "Age 18-25", "Age 25+"],
            datasets: [
                {
                    data: [data1.length, data2.length, data3.length]
                }
            ]
        };
        this.setState({ ageData: data })
    }

    updateGuestsData = async () => {
        const data1 = await queryDB(`no_of_guests='0'`);
        const data2 = await queryDB(`no_of_guests='1'`);
        const data3 = await queryDB(`no_of_guests='2'`);
        const data = {
            labels: ["Av. group 0", "Av. group 1", "Av. group 2"],
            datasets: [
                {
                    data: [data1.length, data2.length, data3.length]
                }
            ]
        };
        this.setState({ averageGroupData: data })
    }

    updateProfessionalsData = async () => {
        const data1 = await queryDB(`profession='Employed'`);
        const data2 = await queryDB(`profession='Student'`);
        const data = [
            {
                name: "Employed",
                population: data1.length,
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Student",
                population: data2.length,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }
        ];
        this.setState({ professionalsData: data })
    }

    createBarChart = (chartData, chartConfig) => {
        if (!chartData) return null;
        const screenWidth = Dimensions.get("window").width;
        return (
            <BarChart
                style={styles.graphStyle}
                data={chartData}
                width={screenWidth - 20}
                height={360}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={50}
                fromZero={true}
            />
        );
    }

    createPieChart = (chartData, chartConfig) => {
        if (!chartData) return null;
        const screenWidth = Dimensions.get("window").width;
        return (
            <PieChart
                data={chartData}
                width={screenWidth - 20}
                height={280}
                chartConfig={chartConfig}
                accessor="population"
                paddingLeft="15"
                style={styles.graphStyle}
            />
        );
    }


    createLineChart = (chartData, chartConfig) => {
        if (!chartData) return null;
        const screenWidth = Dimensions.get("window").width;
        return (
            <LineChart
                style={styles.graphStyle}
                data={chartData}
                width={screenWidth - 20}
                height={360}
                chartConfig={chartConfig}
                verticalLabelRotation={50}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <HamburgerMenu
                    screenTitle={'Report'}
                    onMenuPress={() => this.props.navigation.openDrawer()} />
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.chartView}>
                        <Text style={{ marginTop: 20, marginHorizontal: 5, fontWeight: 'bold', fontSize: 16 }}>Number of people in a given age range (13-18, 18-25 and 25+).</Text>
                        {this.createBarChart(this.state.ageData, chartConfigAge)}
                    </View>
                    <View style={styles.chartView}>
                        <Text style={{ marginTop: 20, marginHorizontal: 5, fontWeight: 'bold', fontSize: 16 }}>Professionals & students count.</Text>
                        {this.createPieChart(this.state.professionalsData, chartConfigProfessionals)}
                    </View>
                    <View style={styles.chartView}>
                        <Text style={{ marginTop: 20, marginHorizontal: 5, fontWeight: 'bold', fontSize: 16 }}>Average group size of people attending the event (using guests count).</Text>
                        {this.createLineChart(this.state.averageGroupData, chartConfigGroups)}
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD'
    },
    mainContainer: {
        flex: 1,
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#FDFDFD'
    },
    graphStyle: {
        height: 350,
        marginVertical: 8,
        marginHorizontal: 5,
        borderRadius: 16
    },
    chartView: {
        marginTop: 5,
        flex: 0.45,
        backgroundColor: "white",
        borderRadius: 20,
        paddingBottom: 10,
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
export default ReportScreen;