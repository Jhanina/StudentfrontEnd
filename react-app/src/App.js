import React, { Component } from "react";
import "./App.css";
import { StudentService } from "./service/StudentService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.items = [
      {
        label: "New",
        icon: "pi pi-fw pi-plus",
        command: () => {this.showSaveDialog()}
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          alert("Updated");
        },
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
        command: () => {
          alert("Deleted");
        },
      },
    ];
    this.studentService = new StudentService();
  }

  componentDidMount() {
    this.studentService
      .getAll()
      .then((data) => this.setState({ students: data }));
    this.setState({
      visible: false,
      student: {
        id: null,
        name: null,
        email: null,
        dob: null,
        age: null,
      },
    });
  }

  render() {
    return (
      <div style={{ width: "80%", marginTop: "20px", margin: "0 auto" }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Students">
          <DataTable value={this.state.students}>
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
          <InputText value={this.state.value} onChange={(e) => this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.name = e.target.value

            return { student };
          })}/>
          <label htmlFor="name">NAME</label>
          </span>
          <span className="p-float-label" id="email">
          <InputText value={this.state.value} onChange={(e) => this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.email = e.target.value

            return { student };
          })}/>
          <label htmlFor="email">EMAIL</label>
          </span>
          <span className="p-float-label" id="dob">
          <InputText value={this.state.value} onChange={(e) => this.setState(prevState => {
            let student = Object.assign({}, prevState.student)
            student.dob = e.target.value

            return { student };
          })}/>
          <label htmlFor="email">DATE OF BIRTH</label>
          </span>
        </Dialog>
      </div>
    );
  }
  showSaveDialog() {
    this.setState({
      visible: true,
    });
  }
}
