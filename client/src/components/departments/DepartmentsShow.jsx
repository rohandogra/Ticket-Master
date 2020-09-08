import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import PageTitle from "../utilityComponents/PageTitle";
import { List } from "antd";
import { connect } from "react-redux";
import {
  getDepartments,
  deleteDepartment,
} from "../../redux/actions/departmentAction";
import { showModal } from "../../redux/actions/modalsAction";
import ModalConfirm from "../utilityComponents/ConfirmModal.jsx";

function DepartmentsShow(props) {
  useEffect(() => {
    if (props.department.length === 0) props.getDepartments();
  }, []);
  return (
    <Layout title="Departments">
      <PageTitle
        title="Departments"
        subTitle={props.department.length}
        onBack={() => props.history.push("/")}
        btnName="Add New Department"
        onClick={() =>
          props.showModal({
            modalType: "ADD_DEPARTMENT",
            modalProps: true,
          })
        }
      />

      <List
        bordered
        loading={props.loading}
        dataSource={props.department.map((ele) => ele)}
        pagination={false}
        renderItem={(item) => (
          <List.Item
            actions={[
              <ModalConfirm
                title="Are you sure?"
                btnType="danger"
                btnName="Delete"
                onOk={() => {
                  props.deleteDepartment(item._id);
                }}
              />,
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  department: state.department.department,
  loading: state.department.loading,
  modal: state.modals.modalProps,
});

export default connect(mapStateToProps, {
  getDepartments,
  showModal,
  deleteDepartment,
})(DepartmentsShow);
