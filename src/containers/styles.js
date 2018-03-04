import React, {StyleSheet} from 'react-native';

export default {
    container: {
        flex:1,
        backgroundColor: '#BFBFBF'
    },

    contEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        container: {
            height: 55,
            backgroundColor: '#2574A9',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5
        },
        
        txtTitle: {
            fontSize: 18,
            fontWeight: '500',
            color: '#FFF'
        }
    },

    body: {
        flex:1,
    },

    placeholder: {
        flex:1
    },

    form: {
        container: {
            paddingTop: 30,
            paddingBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
            minWidth: 300
        },
    }
}
   