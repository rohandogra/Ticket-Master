import React from "react";
import { Modal, Input, Button } from "antd";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modalsAction";
import { createDepartment } from "../../redux/actions/departmentAction";
// import { withRouter } from "react-router-dom";
import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
import "./formModal.scss";
import PageTitle from "../utilityComponents/PageTitle";

function DepartmentAddModal(props) {
  return (
    <div>
      <Modal
        title=""
        centered
        visible={props.modal}
        onCancel={() => {
          props.showModal({
            modalType: "ADD_DEPARTMENT",
            modalProps: false,
          });
        }}
        width={500}
        footer={null}
      >
        <Formik
          initialValues={{ name: "" }}
          // validate={validationSchema}
          onSubmit={(values, { resetForm }) => {
            props.createDepartment(values);
            resetForm();
            props.showModal({
              modalType: "ADD_DEPARTMENT",
              modalProps: false,
            });
          }}
        >
          {({ handleSubmit, touched, error }) => (
            <Form onSubmit={handleSubmit}>
              {/* <div className="form__headerText">Add Customer</div> */}
              <PageTitle title="Add Department" />
              <div className="form__inputContainer">
                <label className="department__label">Department Name</label>
                <div className="form__input">
                  <Field
                    name="name"
                    className="form__inputr"
                    placeholder="Enter Department Name"
                    type="text"
                    as={Input}
                  />
                </div>
              </div>

              <div className="modal__btn">
                <Button className="modal__submit" htmlType="submit">
                  Submit
                </Button>
                <Button
                  className="modal__close"
                  onClick={() => {
                    props.showModal({
                      modalType: "ADD_DEPARTMENT",
                      modalProps: false,
                    });
                  }}
                  type="primary"
                >
                  Close
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  modal: state.modals.modalProps,
});

export default connect(mapStateToProps, { createDepartment, showModal })(
  DepartmentAddModal
);
