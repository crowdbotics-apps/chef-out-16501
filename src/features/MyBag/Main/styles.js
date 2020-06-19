import {StyleSheet, Dimensions} from 'react-native'

const screenSize = Dimensions.get('window');

import {scaleVertical, scale} from "../../../utils/scale";
import DimensionUtils from '../../../utils/DimensionUtils';

export const styles = StyleSheet.create({
    itemsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#F7F7F7",
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
    MapContainer: {
        width: '100%',
        overflow: 'hidden',
        height: 300,
        borderRadius: 15,
        borderWidth: .6,
        borderColor: 'transparent',
        marginTop: scaleVertical(15)
    },
    mapView: {
        width: '100%',
        overflow: 'hidden',
        height: 300,
        borderRadius: 15,
        borderWidth: .6,
        borderColor: 'transparent'
    },
    locationtextContainer: {
        width: '100%',
        justifyContent: 'flex-start'
    },
    locationtextHeader: {
        fontSize: 26,
        color: "#0A1F31",
        marginTop: scaleVertical(15)
    },
    locationtextDetails: {
        fontSize: 18,
        color: "#0A1F31",
        marginTop: scaleVertical(20)
    },
    totalContainer: {
        height: 100,
        width:'100%',
        flexDirection: 'row',
        paddingTop:20,
        paddingHorizontal:20,
        justifyContent: 'space-between',
        borderTopColor:"#E6E6E6",
        borderTopWidth:2
    },

    totalText: {
        color: "#0A1F31",
        fontSize: 26
    },

    totalPriceText: {
        color: "#00A807",
        fontSize: 14
    },

    buttonContainer: {
        borderRadius: 23,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#EC5E53",
        height: 50,
        width: 276,
        marginTop: scaleVertical(20),
        marginBottom: scaleVertical(30)
    },
    buttonText: {
        fontSize: 15,
        color: "#fff"
    },

    orderItemContentContainer: {
      width: '100%',
      alignItems: 'center',
      paddingTop:15,
      paddingBottom:20
  },

  orderItemContent: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal:20
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
      borderRadius:60,
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
      width: '100%',
      height: 2,
  },
});
