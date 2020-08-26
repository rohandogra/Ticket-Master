import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import PageTitle from "../utilityComponents/PageTitle";
import { showModal } from "../../redux/actions/modalsAction";
import { Table, Button } from "antd";
import {
  getEmployees,
  deleteEmployee,
} from "../../redux/actions/employeeAction";
import ModalConfirm from "../utilityComponents/ConfirmModal";
import { connect } from "react-redux";

function EmployeesShow(props) {
  const { employees } = props;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (record) => (
        <div className="customer__ActionButtonContainer">
          <Button
            onClick={() => {
              localStorage.setItem("Employee_ID", JSON.stringify(record));
              props.showModal({
                modalType: "SHOW_EMPLOYEE",
                modalProps: true,
              });
            }}
            className="customer_ActionShow"
          >
            Show
          </Button>
          <ModalConfirm
            title="Are you sure?"
            btnType="danger"
            btnName="Delete"
            onOk={() => {
              props.deleteEmployee(record);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    document.title = "Employees";
    if (employees.length === 0) props.getEmployees();
  }, []);

  const EmployeesData = employees?.map((emp) => ({
    key: emp?._id,
    name: emp?.name,
    email: emp?.email,
    mobile: emp?.mobile,
    department: emp.department?.name,
    action: emp._id,
  }));

  return (
    <Layout>
      <PageTitle
        title="Employees"
        btnName="Add New Employee"
        onBack={() => props.history.push("/")}
        subTitle={employees.length}
        onClick={() => {
          props.showModal({
            modalType: "ADD_EMPLOYEE",
            modalProps: true,
          });
        }}
      />
      <Table
        dataSource={EmployeesData}
        loading={props.loading}
        columns={columns}
        pagination={false}
      />
    </Layout>
  );
}
const mapStateToProps = (state) => ({
  modal: state.modals,
  employees: state.employee.employees,
  loading: state.employee.loading,
});

export default connect(mapStateToProps, {
  showModal,
  getEmployees,
  deleteEmployee,
})(EmployeesShow);
