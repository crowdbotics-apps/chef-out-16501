import {StyleSheet, Dimensions} from 'react-native'
import DimensionUtils from '../../../utils/DimensionUtils';

const windowWidth = Dimensions
    .get('window')
    .width;
const windowHeight = Dimensions
    .get('window')
    .height;

import {scaleVertical, scale} from "../../../utils/scale";

export const styles = StyleSheet.create({
    itemsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#F7F7F7",
        flex: 1,
    },

    header: {
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    headerBg: {
        width: windowWidth,
        height: 140+DimensionUtils.safeAreaTopHeight,
        justifyContent: 'flex-start',
        position: 'relative',
        backgroundColor: "#0A1F31",
        paddingHorizontal: scale(20),
        paddingTop: DimensionUtils.safeAreaTopHeight+scaleVertical(20)
    },

    heading: {
        paddingTop: scaleVertical(15),
        color: "#fff",
        fontSize: 26
    },

    orderTimeText: {
        fontSize: 18,
        textAlign: 'center',
        color: "#A7A8AB",
        marginVertical: scaleVertical(5)
    },

    orderItemContentContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: scaleVertical(15)
    },

    orderItemContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    orderSizeText: {
        marginEnd: scale(15),
        fontSize: 18,
        color: "#0A1F31"
    },

    orderPriceText: {
        marginEnd: scale(15),
        fontSize: 18,
        color: "#00A807"
    },
    orderItemImage: {
        width: 86,
        height: 86,
        borderRadius:50,
        overflow:'hidden'
    },
    orderItemDescription: {
        marginHorizontal: scale(15),
        flex: 1
    },
    orderItemName: {
        fontSize: 18,
        color: "#0A1F31"
    },
    orderItemNotes: {
        fontSize: 14,
        color: "#6D7477"
    },

    orderListContainer: {
        paddingHorizontal:scale(35) ,
        paddingVertical: scaleVertical(20),
        backgroundColor: '#fff'
    },

    orderItemSeparator: {
        marginTop: scaleVertical(15) ,
        backgroundColor: "#E8E8E8",
        width: '80%',
        height: 2,
        marginHorizontal: scale(20)
    },

    totalContainer: {
        backgroundColor: "#F7F7F7",
        height: 136,
        padding: scale(40),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    totalText: {
        color: "#0A1F31",
        fontSize: 26
    },

    totalPriceText: {
        color: "#00A807",
        fontSize: 26
    },

    okayContainer: {
        backgroundColor: "#fff",
        height: 156,
        paddingHorizontal: scale(40),
        width: '100%',
        alignItems: 'center',
        marginBottom: scaleVertical(30)
    },

    okayText: {
        color: "#0A1F31",
        fontSize: 18,
        marginTop:scaleVertical(18)
    },

    buttonContainer: {
        borderRadius: 23,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#EC5E53",
        height: 50,
        width: 276,
        marginTop: scaleVertical(30)
    },
    buttonText: {
        fontSize: 15,
        color: "#fff"
    }
});
