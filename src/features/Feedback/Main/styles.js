import {StyleSheet, Dimensions} from 'react-native';
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
        paddingHorizontal: scale(15)
    },
    image: {
        resizeMode: "cover",
        marginBottom: scale(10),
        position: 'absolute',
        top: 0
    },

    imageBg: {
        width: '100%',
        height: windowWidth / 2.6
    },
    header: {
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    headerBg: {
        marginTop: 0,
        width: windowWidth,
        height: 140+DimensionUtils.safeAreaTopHeight,
        paddingHorizontal: scale(20),
        justifyContent: 'flex-start',
        position: 'relative',
        paddingHorizontal: scale(20),
        paddingTop: DimensionUtils.safeAreaTopHeight
    },
    heading: {
        paddingTop: scaleVertical(15),
        color: "#fff",
        fontSize: 26
    },

    feedbackText: {
        fontSize: 18,
        color: "#6D7477",
        marginVertical: scaleVertical(15)
    },
    contentContainer: {
        width: '100%',
        paddingVertical: scaleVertical(20),
        paddingHorizontal: scale(15),
        flex: 1,
        alignItems: 'center'
    },

    inputContainer: {
        marginVertical: scaleVertical(20),
        backgroundColor: '#fff',
        height: 135,
        width: '100%',
        paddingHorizontal: scale(20),
        paddingVertical: scaleVertical(8),
        borderRadius: 10,
        borderWidth: .7,
        borderColor: 'transparent'
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 0,
        fontSize: 18
    },

    buttonContainer: {
        borderRadius: 23,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#EC5E53",
        height: 50,
        width: 276,
        marginTop: scaleVertical(20),
        marginBottom: scaleVertical(8)
    },
    buttonText: {
        fontSize: 15,
        color: "#fff"
    }
});
