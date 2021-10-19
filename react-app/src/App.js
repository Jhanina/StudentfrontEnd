import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { StudentService } from "./service/StudentService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import {Button} from "primereact/button"

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class App extends Component {
  constructor() {
    
    super();
    this.state = {
      visible: false,
      visible2:false,
      student: {
        name: "",
        email: "",
        dob: "",
      },
      selectedStudent:{ 

      }
    };
    this.items = [
      {
        label: "New",
        icon: "pi pi-fw pi-plus",
        command: () => {this.showSaveDialog()}
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        command: () => {this.showUpdateDialog()    },
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
        command: () => {this.eliminar()},
      },
    ];
    
    this.studentService = new StudentService();
  }

  componentDidMount() {
    this.studentService
      .getAll()
      .then((data) => this.setState({ students: data }));
    
  }
  guardar = () => {
   this.studentService.registerNewStudents(this.state.student).then((response) => {
        console.log(response.data)
    });
    // StudentService.getAll().then((response) => {
    //     this.setState({ students: response.data })
    // });
    this.setState({ visible: false });
}
editar = () => {
  this.studentService.updateStudents(this.state.student.id, this.state.student.name, this.state.student.email)
  this.setState({ visible2: false });
  console.log(this.state)
};
eliminar = (id) => {
  var opcion = window.confirm("Estás Seguro que deseas Eliminar al estudiante " +this.state.selectedStudent.name);
  if (opcion === true) {
      this.studentService.deleteStudents(this.state.selectedStudent.id).then((response) => {
          console.log(response.data)

      });
  }
};

  
  render() {
    return (
      <div style={{ width: "80%", marginTop: "20px", margin: "0 auto" }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Students">
          <DataTable value={this.state.students} selectionMode="single" selection={this.state.selectedStudent} onSelectionChange={e => this.setState({selectedStudent:e.value})}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="dob" header="Birthday"></Column>
            <Column field="age" header="Age"></Column>
          </DataTable>
        </Panel>
        <Dialog
          header="Add Student"
          visible={this.state.visible}
          style={{ width: "400px" }}
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          <span className="p-float-label" id="name">
          <InputText type="text" value={this.state.student.name} onChange={(e) => this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.name = e.target.value

            return { student };
          })}/>
          <label htmlFor="name">NAME</label>
          </span>
          <span className="p-float-label" id="email">
          <InputText type="email" value={this.state.student.email} onChange={(e) => this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.email = e.target.value

            return { student };
          })}/>
          <label htmlFor="email">EMAIL</label>
          </span>
          <span className="p-float-label" id="dob">
          <InputText type="date" value={this.state.student.dob} onChange={(e) => this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.dob = e.target.value

            return { student };
          })}/>
          </span>
          <Button  onClick={()=>this.guardar()}> guardar</Button>
        </Dialog>
        <Dialog
          header="Edit Student"
          visible={this.state.visible2}
          style={{ width: "400px" }}
          modal={true}
          onHide={() => this.setState({ visible2: false })}
        >
          <span className="p-float-label" id="name">
          <InputText type="text" value={this.state.student.name} onChange={(e) => this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.name = e.target.value

            return { student };
          })}/>
          <label htmlFor="name">NAME</label>
          </span>
          <span className="p-float-label" id="email">
          <InputText type="email" value={this.state.student.email} onChange={(e) => this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.email = e.target.value

            return { student };
          })}/>
          {/* <label htmlFor="email">EMAIL</label> */}
          </span>
          {/* <span className="p-float-label" id="dob">
          <InputText type="date" value={this.state.student.dob} onChange={(e) => this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.dob = e.target.value

            return { student };
          })}/>
          </span> */}
          <Button  onClick={()=>this.editar()}> guardar</Button>
        </Dialog>
      </div>
    );
  }
  showSaveDialog() {
    this.setState({
      visible: true,
    });
  }
  showUpdateDialog(){
    this.setState({
      visible2:true,
      student: {
        id: this.state.selectedStudent.id,
        name: this.state.selectedStudent.name,
        email: this.state.selectedStudent.email
      },
    })
  }
}
