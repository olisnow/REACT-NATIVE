import React from 'react';
import Header from './components/header';
import {View } from 'react-native';
import TaskList from './components/task-list';
import { Text } from 'react-native-elements';
import { ScrollView } from 'react-native';
import ButtonAddTask from './components/button-add-task';
import MenuTask from './components/menu-task';
import lodash from 'lodash';
import {TASK} from './components/model'
import TextPromt from './components/text-prompt'
import { style } from './components/header/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'taskList';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      taskList:[], 
      isMenuTaskVisible:false, 
      currentTask:{},
      isAddPromptVisible: false, 
      isRenamePromtVisible: false,
      idGenerator:0
    };
  }

  componentTaskWillMount() {
    AsyncStorage.getItem(storageKey).then(storageTaskList =>{
      if(storageTaskList){
        this.setState({taskList : JSON.parse(storageTaskList)}, () => {
            this.setState({idGenerator:this.state.taskList(this.state.taskList.length -1)
            .id +1})
        });
      }
    });
  }

  toggleMenuTaskVisibility = task => {
    let currentTask = task;
    if(this.state.isMenuTaskVisible){
      currentTask = {};
    }
    this.setState({
      isMenuTaskVisible: !this.state.isMenuTaskVisible, 
      currentTask: task
    });
  };

  deleteCurrentTack = () =>{
    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id
    });

    const list = this.state.taskList;
      list.splice(index,1);
      this.setState({taskList:list,currentTask:{} }, () => {
        this.toggleMenuTaskVisibility();
        this.savetasklist();
      })
  };

  
  changeStatusCurrentTask = () =>{
    const updatedTask = this.state.currentTask;
    updatedTask.status = this.state.currentTask.status === TASK.doneStatus ? TASK.todoStatus : TASK.doneStatus;

    console.log(updatedTask.status);
    
    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id
    });

    const updatedTaskList = this.state.taskList;
    updatedTaskList[index] = updatedTask;
    this.setState({
      taskList:updatedTaskList,
      isMenuTaskVisible:false,
      currentTask:{}
    }, () => {
      this.savetasklist();
    })

  };

  hideAddPrompt = () => {
    this.setState({isAddPromptVisible: false});
  }

  hideRenamePrompt = () => {
    this.setState({isRenamePromtVisible: false});
  }


  onAddTask = (value) => {

    const newTask ={
      id: this.state.idGenerator,
      content : value,
      status : TASK.todoStatus,
    };
    // Déstructuration : ... éclate le tableau
    this.setState({
      taskList:[...this.state.taskList, newTask], 
      isAddPromptVisible: false,
      idGenerator : this.state.idGenerator+1})
    
  }

  RenameTask= (value) => {

    const updatedTask = this.state.currentTask;
    updatedTask.content = value;

    const index = lodash.findIndex(this.state.taskList, {
      id: this.state.currentTask.id
    });

    const updatedTaskList = this.state.taskList;
    updatedTaskList[index] = updatedTask;

    // Déstructuration : ... éclate le tableau
    this.setState({taskList: updatedTaskList}, () =>{
      this.hideRenamePrompt();
      this.savetasklist();
    });
  };


  displayAddPrompt = () => {
      this.setState({isAddPromptVisible: true});
  }

  displayRenamePrompt = (task) => {
    console.log("displayRenamePrompt");
    this.setState({currentTask : task, isRenamePromtVisible: true});
  }


  savetasklist = () => {
    AsyncStorage.setItem(storageKey,JSON.stringify(this.state.taskList));
  }

  renderTaskList = () => {
    console.log("taille: " + this.state.taskList.length);
    if (this.state.taskList.length > 0 ){
      return (
        <TaskList 
          onPressCallBack={this.toggleMenuTaskVisibility} 
          onLongPressCallBack = {this.displayRenamePrompt}
          taskList={this.state.taskList}
       />
      )
    }
    return <View style={style.noTask}><Text>Cliquer sur le bouton ajouter pour créer une tâche</Text></View>
  }

  render() {      
    return(
      <View style={{flex:1}}>
        <Header content="Liste de tâches"/>
        <ScrollView>
            {this.renderTaskList()}
        </ScrollView>
        <MenuTask 
          isVisible={this.state.isMenuTaskVisible} 
          onDisapearCallBack={this.toggleMenuTaskVisibility}
          onChangeStatusCallBack={this.changeStatusCurrentTask}
          onDeleteCallBack={this.deleteCurrentTack}
          />
          <TextPromt 
            isVisible={this.state.isAddPromptVisible} 
            onCancelCallBack ={this.hideAddPrompt} 
            onSubmitCallBack={this.onAddTask}
            title={'Ajouter une nouvelle tâche'}
            placeHolder={'ex : Acheter du lait'}
            defaultValue={""}
          />
          <TextPromt 
            isVisible={this.state.isRenamePromtVisible} 
            onCancelCallBack ={this.hideRenamePrompt} 
            onSubmitCallBack={this.RenameTask}
            title={'Renommer la tâche'}
            defaultValue={this.state.currentTask.content}
          />
        <ButtonAddTask onPressCallBack={this.displayAddPrompt}/>
      </View>
    );
  }
}