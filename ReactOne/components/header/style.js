import {StyleSheet} from 'react-native';
import {APP_COLORS} from '../../styles/colors';

export const style = StyleSheet.create({
    subHeader:{
        backgroundColor : APP_COLORS.darkprimary,
        height: 30
    },

    header:{
        backgroundColor : APP_COLORS.primary,
        height: 150,
        // centrage
        justifyContent: "center",
        alignItems: "center", 
        // ombre
        shadowColor: APP_COLORS.shadow,
        shadowOpacity : 0.2,
        shadowOffset: {height: 10},  
    },

    text:{
        color : APP_COLORS.primaryText,
        fontSize: 30
        
    },
    noTask:{
        marginTop:30,
        alignItems:'center'
    }
});