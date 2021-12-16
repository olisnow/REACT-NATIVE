import React from 'react';
import {APP_COLORS} from '../../styles/colors';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-elements';

const ButtonAddTask = ({onPressCallBack}) => (
    <ActionButton
    buttonColor={APP_COLORS.primaryAction}
    Icon={<Icon color={APP_COLORS.primaryText} name={'add'}/>}
    onPress={() => onPressCallBack()}
    />
)


export default ButtonAddTask; 