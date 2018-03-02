/**************************************************************
 *  FileName:           styles.js
 *  Description:        Company Policy Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        backgroundColor: '#fff',
        borderRadius: 2,
        marginTop: 7,
        marginBottom: 3,
        marginLeft: 10,
        marginRight: 10,
        elevation: 5,
        paddingBottom: 20,
        borderRadius: 2
    },

    header: {
        container: {
            backgroundColor: 'transparent',
            height: 60,
            flexDirection: 'row'
        },

        contTitle: {
            flex: 1,
            backgroundColor: 'transparent'
        },

        placeHolderTitle: {
            flex: 1,
            paddingTop: 10,
            paddingBottom: 15,
            paddingLeft: 40,
            paddingRight: 40,
            alignSelf: 'flex-start',
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
            /* borderBottomRightRadius: 50 */
        },

        contBtn: {
            width: 70,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'

        },

        txtTitle: {
            fontSize: 15,
            color: '#505251',
            fontWeight:'500',
            fontFamily: 'Helvetica-Bold'
        }
    },

    content: {
        container: {
            marginLeft: 40,
            backgroundColor: 'transparent'
        },

        placeHolderData: {
            flexDirection: 'row',
            paddingTop: 3,
            paddingBottom: 3,
            borderTopWidth: 1,
            borderColor: '#D1D4D6'
        },

        contLabel: {
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'flex-start'
        },

        contValue: {
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'flex-start'
        },

        txtLabel: {
            fontSize: 13,
            color: '#838383',
            fontFamily: 'Helvetica-Light'
        },

        txtValue: {
            fontSize: 14,
            color: '#434646',
            fontFamily: 'Helvetica-Light'
        },

        txtValueTitle: {
            fontWeight: 'bold',
            color: '#434646',
            fontFamily: 'Helvetica-Light'
        },

        txtValueDescription: {
            fontSize: 13,
            color: '#434646',
            fontFamily: 'Helvetica-Light',
            fontWeight: '100'
        }
    }
}