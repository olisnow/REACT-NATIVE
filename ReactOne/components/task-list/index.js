import React from 'react';
import { APP_COLORS } from '../../styles/colors';
import {Badge} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {TASK} from '../model';
import {style} from './style';


const TaskList = ({taskList, onPressCallBack, onLongPressCallBack}) => (

    taskList.map((taskList) => (
            <ListItem key={taskList.id}  
            containerStyle={style.list}
            onLongPress={() => onLongPressCallBack(taskList)}
            onPress={() => onPressCallBack(taskList)}
            >
                <ListItem.Content>
                    <ListItem.Title>{taskList.content}</ListItem.Title>
                    <ListItem>
                        <Badge
                            value={taskList.status}
                            containerStyle={
                                (
                                    taskList.status === TASK.todoStatus 
                                    ? { backgroundColor: APP_COLORS.accent }
                                    : { backgroundColor: APP_COLORS.lightPrimaryColor }
                                )
                            }
                        />
                    </ListItem>
                </ListItem.Content>
            </ListItem>
      ))
);

export default TaskList;