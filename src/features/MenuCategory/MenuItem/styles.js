import {StyleSheet} from 'react-native'

import {scaleVertical, scale} from "../../../utils/scale";
import DimensionUtils from '../../../utils/DimensionUtils';

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        display: 'flex'
    },
    itemsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: scale(20),
        paddingTop: DimensionUtils.safeAreaTopHeight
    },
    image: {
        resizeMode: "cover",
        marginBottom: scale(10),
        position: 'absolute',
        top: 0
    },

    grid: {
        width: '100%',
        backgroundColor: 'transparent',
        marginVertical: scaleVertical(15),
        flex: 1
    },

    gridRow: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        minHeight: 155,
        margin: scale(5),
        paddingBottom:scaleVertical(8)
    },
    imageBg: {
        width: '100%',
        height: 89
    },
    itemName: {
        fontSize: 18,
        padding: scale(7)
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#00A807"
    },
    addContainer: {
        height: 26,
        borderWidth: .5,
        borderColor: "#DEDEDF",
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addText: {
        color: "#EC5E53",
        fontSize: 16
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(7),
        alignItems: 'center',
        paddingBottom: 5
    },
    bottomItemsContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    header: {
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    heading: {
        paddingTop: 15,
        color: "#fff",
        fontSize: 26
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 30
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        backgroundColor: '#000'
    }
});
