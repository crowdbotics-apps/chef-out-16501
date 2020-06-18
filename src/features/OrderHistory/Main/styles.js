import {StyleSheet, Dimensions} from 'react-native'

const screenSize = Dimensions.get('window');
import DimensionUtils from '../../../utils/DimensionUtils';

import {scaleVertical, scale} from "../../../utils/scale";

export const styles = StyleSheet.create({
    itemsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#F7F7F7",
        flex: 1,
        paddingHorizontal: scale(20),
    },
    topBgImage:{
        marginTop: 0,
        width: screenSize.width,
        height: 140 + DimensionUtils.safeAreaTopHeight,
        paddingHorizontal: scale(20),
        paddingTop: DimensionUtils.safeAreaTopHeight,
        justifyContent: 'center',
        position: 'relative'
    },
    image: {
        resizeMode: "cover",
        marginBottom: scale(10),
        position: 'absolute',
        top: 0
    },

    imageBg: {
        width: '100%',
        height: screenSize.width / 2.6
    },
    header: {
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    heading: {
        paddingTop: scaleVertical(15),
        color: "#fff",
        fontSize: 26
    },

    // review container styles
    reviewContainer: {
        width: '100%',
        paddingVertical:20,
        paddingHorizontal: 15,
        flex:1
    },
    reviewItemContainer: {
        minHeight: 120,
        borderColor: "#707070",
        borderWidth: .2,
        borderRadius: 5,
        marginVertical: scaleVertical(5)
    },
    reviewItemContent: {
        flexDirection: 'row',
        paddingHorizontal: scale(10),
        paddingTop: scaleVertical(17)
    },
    reviewPersonImage: {
        height: 46,
        width: 46
    },
    reviewDescriptionContent: {
        flex: 1,
        paddingHorizontal: scale(10),
        alignItems: 'flex-start'
    },
    reviewPersonName: {
        color: "#0A1F31",
        fontSize: 18,
        marginBottom: scaleVertical(5)
    },
    reviewPaymentMethod: {
        color: "#0A1F31",
        marginTop: scaleVertical(8),
        fontSize: 14
    },

    reviewOrderStatus: {
        color: "#0A1F31",
        marginTop: scaleVertical(1),
        fontSize: 14
    },

    reviewDateTimeContent: {
        maxWidth: 117,
        height: 57,
        alignItems: 'flex-end'
    },
    reviewTimeText: {
        color: "#6D7477",
        fontSize: 14
    }
});
