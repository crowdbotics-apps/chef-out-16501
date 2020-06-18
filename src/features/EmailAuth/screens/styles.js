import {StyleSheet} from "react-native";

import {scaleVertical, scale} from "../../../utils/scale";

export const styles = StyleSheet.create({
    screen: {
        justifyContent: "flex-start",
        alignItems: "center",
        padding: scale(20)
    },
    heading: {
        color: "#EC5E53",
        fontSize: 42,
        paddingTop: scaleVertical(50),
        marginTop: scaleVertical(15),
        width: '100%',
        textAlign: 'center'
    },
    subHead: {
        color: "#0A1F31",
        fontSize: 26,
        paddingTop: scaleVertical(30),
        paddingBottom: scaleVertical(10),
        width: '100%',
        textAlign: 'center'
    },

    description: {
        color: "#0A1F31",
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
        paddingBottom: scaleVertical(10),
    },
    input: {
        backgroundColor: 'white',
        //marginLeft: scale(10), marginRight: scale(10),
        marginTop: scaleVertical(5),
        marginBottom: scaleVertical(5),
        //borderRadius: 12,
        borderColor: '#E5E5E5'
    },
    label: {
        fontWeight: "bold",
        paddingStart: scale(10)
    },

    fieldContainer: {
        alignItems: 'flex-start',
        width: '100%',
        marginTop: scaleVertical(8)
    },

    actionButon: {
        backgroundColor: '#EC5E53',
        borderWidth: 0,
        marginLeft: scale(10),
        marginRight: scale(10),
        marginTop: scaleVertical(15),
        borderRadius: 25,
        height: 50,
        width: 276,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    Or: {
        marginVertical: scaleVertical(10)
    },
    fbIcon: {
        width: 18,
        height: 18,
        marginEnd:8
    },

    image: {
        resizeMode: "cover",
        marginBottom: scale(10),
        position: 'absolute',
        top: 0
    },

    textRow: {
        textAlign: "right",
        color: '#EC5E53',
        width: '100%'
    },

    signUp: {
        textAlign: "center",
        color: '#6D7477',
        width: '100%',
        marginTop: scaleVertical(24)
    },

    boldText: {
        fontWeight: 'bold'
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: scaleVertical(24),
        justifyContent: 'center',
        display: 'none'
    },
    button: {
        marginHorizontal: 14,
        marginTop: 27.5,
        alignSelf: "center",
        borderColor: '#ED6854',
        borderWidth: 2,
        padding: 15,
        borderRadius: 32,
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'black'
    }
});