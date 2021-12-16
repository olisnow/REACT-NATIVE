import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import {style} from './style';

const MenuTask = ({isVisible, onDisapearCallBack, onDeleteCallBack, onChangeStatusCallBack}) =>(
    <TouchableWithoutFeedback onPress={() => onDisapearCallBack()}>
        <Modal 
            isVisible={isVisible}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationOutTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            >
            <TouchableWithoutFeedback onPress={() => console.log("rest")}>
            
                <View style={style.modal}>
                    <View style={style.textView}>
                        <Text>Que Souhaitez vous faire sur la tâche?</Text>
                    </View>
                    <View style={style.buttonView}>
                        <Button
                            buttonStyle= {style.buttonDelete}
                            title="Supprimer"
                            onPress={() => onDeleteCallBack()}
                        />
                        <Button 
                            buttonStyle= {style.buttonChangeStatus}
                            title="Changer status"
                            onPress={() => onChangeStatusCallBack()}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </TouchableWithoutFeedback>
);

export default MenuTask;