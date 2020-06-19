import {StyleSheet,Dimensions} from 'react-native'

const screenSize = Dimensions.get('window');
import DimensionUtils from '../../../utils/DimensionUtils';

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
        marginVertical:scaleVertical(15),
        flex:1
    },

    imageBg: {
        width: '100%',
        height: screenSize.width/2.6,
    },
    gridRow: {
      borderRadius: 15,
      backgroundColor: '#ffffff50',
      flex: 1,
      flexDirection: 'column',
      height: screenSize.width/2.6,
      margin: scale(5),
      overflow:'hidden'
  },
    categoryName: {
        fontSize: 18,
        color: '#fff',
        marginStart: scale(10)
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
