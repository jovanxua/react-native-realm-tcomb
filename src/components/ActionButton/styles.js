const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        width: 55,
        height: 55,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 126, 0, 0.9);',        
        elevation: 20,
        position: 'absolute',
        zIndex: 999,
        bottom: 15,
        right: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 100,
        elevation: 10,
    },

    contBtn: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    }
}