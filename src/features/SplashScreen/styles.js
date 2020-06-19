import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        display: 'flex',
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#EC5E53",
        flex: 1
    },
    item: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        padding: 10,
        color: 'black',
        width: '48%',
        margin: 2,
    },
    itemLogo: {
    },
    itemFont: {
        color: 'black',
        fontWeight: 'bold',
        padding: 10
    },

    logo: {
        width: "100%"
    },
    mainText: {
        fontSize: 20,
        fontFamily: "Roboto-Medium",
        marginTop: 20,
        color: "#130D3C"
    },
}); 
