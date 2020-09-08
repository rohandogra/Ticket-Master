import React, { useEffect } from "react";
import { Table, Button } from "antd";
import Layout from "../../layouts/Layout";
import PageTitle from "../utilityComponents/PageTitle";
import { connect } from "react-redux";
import {
  getCustomers,
  deleteCustomer,
} from "../../redux/actions/customerAction";
import { showModal } from "../../redux/actions/modalsAction";
import ModalConfirm from "../utilityComponents/ConfirmModal";
import "./customers.scss";

function CustomersShow(props) {
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (record) => (
        <div className="customer__ActionButtonContainer">
          <Button
            onClick={() => {
              localStorage.setItem("Customer_ID", JSON.stringify(record));
              props.showModal({
                modalType: "SHOW_CUSTOMER",
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
              props.deleteCustomer(record);
            }}
          />
        </div>
      ),
    },
  ];

  const { customers } = props;

  const cust = customers?.map((ele) => ({
    ...ele,
    key: ele._id,
    action: ele._id,
  }));

  useEffect(() => {
    if (customers.length === 0) return props.getCustomers();
  }, [customers._id, customers.name, customers.email]);
  return (
    <Layout title="Customers" className="customerShow">
      <PageTitle
        title="Customers"
        onBack={() => props.history.push("/")}
        subTitle={customers?.length}
        btnName="Add New Customer"
        onClick={() => {
          props.showModal({
            modalType: "ADD_CUSTOMER",
            modalProps: true,
          });
        }}
      />
      <Table
        dataSource={cust}
        loading={props.loading}
        columns={columns}
        pagination={false}
      />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  modal: state.modals,
  customers: state.customers.customers,
  loading: state.customers.loading1,
});

export default connect(mapStateToProps, {
  getCustomers,
  showModal,
  deleteCustomer,
})(CustomersShow);
