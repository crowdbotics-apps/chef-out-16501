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
        paddingTop: DimensionUtils.safeAreaTopHeight,
    },

    grid: {
        width: '100%',
        backgroundColor: 'transparent',
        flex: 1,
        marginBottom: scaleVertical(8)
    },

    gridRow: {
        minHeight: windowWidth * 0.5,
        paddingEnd: scale(10),
        paddingTop: scaleVertical(10),
        flex: 1
    },
    header: {
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    headerImageBg: {
        marginTop: 0,
        width: windowWidth *1.3,
        height: windowHeight * .5,
        justifyContent: 'center',
        position: 'absolute',
        borderRadius:windowHeight * .5,
    },
    topContainer: {
        height: windowHeight * .5,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: scaleVertical(20),
        paddingHorizontal: scale(20)
    },
    topContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    topHeading: {
        fontSize: 26,
        color: '#0A1F31'
    },
    topDescribe: {
        textAlign: 'center',
        color: "#6D7477",
        fontSize: 16,
        marginVertical: scaleVertical(8)
    },
    startCountText: {
        textAlign: 'center',
        color: "#FFD027",
        fontSize: 18,
        marginTop: scaleVertical(5)
    },
    pagerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%'
    },
    //size layout //
    sizeContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: scale(20),
        paddingVertical: scaleVertical(20),
        alignItems:'center',
        justifyContent:'space-between'
    },
    sizeGridItemContainer: {
        borderRadius: 3,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: "#707070",
        borderWidth: 2
    },
    sizeSeletectItemIcon: {
        position: 'absolute',
        top: -10,
        right: -10,
        height: 36,
        width: 36
    },
    sizeItemImage: {
        marginTop: scaleVertical(10),
        marginBottom: scaleVertical(8),
        width: '60%',
        height: '60%'
    },
    sizeTextMain: {
        textAlign: 'center',
        fontSize: 18,
        color: "#0A1F31"
    },
    sizeTextDescribe: {
        textAlign: 'center',
        fontSize: 18,
        color: "#0A1F31",
        marginBottom: scaleVertical(8)
    },

    //adons styles
    adOnsContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: scale(35),
        paddingVertical: scaleVertical(20)
    },
    adOnsItemContainer: {
        height: 24,
        marginVertical: scaleVertical(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    adOnsItemCheckBox: {
        color: '#0A1F31',
        fontSize: 18
    },
    adOnsItemPriceText: {
        color: "#00A807",
        fontSize: 18,
        fontWeight: 'bold'
    },
    // review container styles
    reviewContainer: {
        backgroundColor: '#fff',
        padding: scale(20)
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
        fontSize: 18
    },
    reviewPersonComment: {
        color: "#0A1F31",
        marginTop: scaleVertical(8),
        fontSize: 14
    },

    reviewDateTimeContent: {
        width: 117,
        height: 57,
        alignItems: 'flex-end'
    },
    reviewTimeText: {
        color: "#6D7477",
        fontSize: 14
    },

    checkoutButtonContainer: {
        borderRadius: 23,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#EC5E53",
        height: 50,
        width: 276,
        marginBottom: scaleVertical(8)
    },
    checkoutButtonText: {
        fontSize: 18,
        color: "#fff"
    }
});
