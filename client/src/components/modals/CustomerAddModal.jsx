import React from "react";
import { Modal, Input, Button } from "antd";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modalsAction";
import { createCustomers } from "../../redux/actions/customerAction";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
import "./formModal.scss";
import PageTitle from "../utilityComponents/PageTitle";

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   module: Yup.number()
//     .min(10, "Too Short!")
//     .max(10, "Too Long!")
//     .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
// });

function CustomerAddModal(props) {
  return (
    <Modal
      title=""
      centered
      visible={props.modal}
      onCancel={() => {
        props.showModal({
          modalType: "ADD_CUSTOMER",
          modalProps: false,
        });
      }}
      width={500}
      footer={null}
    >
      <Formik
        initialValues={{ name: "", email: "", mobile: "" }}
        // validate={validationSchema}
        onSubmit={(values, { resetForm }) => {
          props.createCustomers(values);
          resetForm();
          props.showModal({
            modalType: "ADD_CUSTOMER",
            modalProps: false,
          });
        }}
      >
        {({ handleSubmit, touched, error }) => (
          <Form onSubmit={handleSubmit}>
            {/* <div className="form__headerText">Add Customer</div> */}
            <PageTitle title="Add Customer" />
            <div className="form__inputContainer">
              <label>Name</label>
              <div className="form__input">
                <Field
                  name="name"
                  className="form__inputr"
                  placeholder="Enter You're Full Name"
                  type="text"
                  as={Input}
                />
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Email</label>
              <div className="form__input">
                <Field
                  name="email"
                  placeholder="Enter You're Email"
                  type="email"
                  as={Input}
                />
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Mobile</label>
              <div className="form__input">
                <Field
                  name="mobile"
                  placeholder="Enter You're Mobile"
                  type="number"
                  as={Input}
                />
              </div>
            </div>
            <div className="modal__btn">
              <Button className="modal__submit" htmlType="submit">
                Submit
              </Button>{" "}
              <Button
                className="modal__close"
                onClick={() => {
                  props.showModal({
                    modalType: "ADD_CUSTOMER",
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
  );
}
const mapStateToProps = (state) => ({
  modal: state.modals.modalProps,
});

export default connect(mapStateToProps, { showModal, createCustomers })(
  withRouter(CustomerAddModal)
);
