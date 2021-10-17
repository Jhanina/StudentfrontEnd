import React, {Component} from 'react';
import './App.css';
import { StudentService } from './service/StudentService';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel'
import { Button } from 'primereact/button';

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

export default class App extends Component{
  constructor(){
    super();
    this.state = {};  
    this.studentService = new StudentService();
  }

  componentDidMount(){
    this.studentService.getAll().then(data => this.setState({students: data}))
  }

  render(){
    return (
      <Panel header="Students" style={
        {width: '80%', marginTop: '20px', margin: '0 auto'}}>
        <DataTable value={this.state.students}>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="dob" header="Birthday"></Column>
          <Column field="age" header="Age"></Column>
      </DataTable>
      </Panel>             
    );
  }

}