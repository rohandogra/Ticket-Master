import React from "react";
import { connect } from "react-redux";
import CustomerAddModal from "./CustomerAddModal";
import ShowCustomerModal from "./showCustomerModal";
import DepartmentAddModal from "./DepartmentAddModal";
import EmployeesAddModal from "./EmployeesAddModal";
import ShowEmployeeModal from "./ShowEmployeeModal";
import TicketAddModal from "./TicketAddModal";
import TicketShowModal from "./TicketShowModal";

const modals = {
  ADD_CUSTOMER: CustomerAddModal,
  ADD_DEPARTMENT: DepartmentAddModal,
  ADD_EMPLOYEE: EmployeesAddModal,
  ADD_TICKET: TicketAddModal,
  SHOW_CUSTOMER: ShowCustomerModal,
  SHOW_EMPLOYEE: ShowEmployeeModal,
  SHOW_TICKET: TicketShowModal,
};

const RootModal = (props) => {
  const { modalType, modalProps } = props.modal;

  if (!modalType) {
    return null;
  }

  const Modal = modals[modalType];

  return <Modal {...modalProps} />;
};

const mapStateToProps = (state) => ({
  modal: state.modals,
});

export default connect(mapStateToProps)(RootModal);
