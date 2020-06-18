import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        display: 'flex'
    },
    itemsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#0A1F31",
        flex: 1
    },
    bottomItemsContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    heading: {
        paddingTop: 15,
        color: "#fff",
        fontSize: 32
    },
    heading2: {
        marginTop: 15,
        color: "#fff",
        fontSize: 20
    },
    text: {
        marginTop: 2,
        color: "#fff",
        fontSize: 13,
        textAlign: 'center'
    },
    menu_icon: {
        width: 37,
        height: 9,
        marginTop: 10
    },
    buttonContainer: {
        borderRadius: 23,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#EC5E53",
        height: 50,
        width: 257,
        marginTop: 30,
        marginBottom: 8
    },
    buttonText: {
        fontSize: 15,
        color: "#fff"
    }
});
