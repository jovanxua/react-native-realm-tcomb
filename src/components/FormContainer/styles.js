import React, {StyleSheet} from 'react-native';

export default {
    container: {
        flex:1,
    },

    header: {
        container: {
            height: 60,
            backgroundColor: '#2574A9',
            flexDirection: 'row',
            elevation: 10,
        },

        left: {
            width: 55,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 15
        },

        right: {
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 15,
            width: 55,
            backgroundColor: 'transparent'
        },

        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent'
        },

        txtTitle: {
            fontSize: 17,
            fontWeight: '500',
            color: '#FFFFFF'
        },

        txtSave: {
            fontSize: 15,
            color: '#dbdcdd'
        }
    },

    body: {
        container: {
            flex: 1,
            backgroundColor: '#013243'
        },

        content: {
            flex: 1
        }
    },
}
   