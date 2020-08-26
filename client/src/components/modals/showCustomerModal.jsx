import React, { useEffect, useState, useRef } from "react";
import { Modal, Input, Spin } from "antd";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modalsAction";
import { withRouter } from "react-router-dom";
import {
  getCustomerById,
  updateCustomer,
  getCustomers,
} from "../../redux/actions/customerAction";
import { Formik, Field, Form } from "formik";
import PageTitle from "../utilityComponents/PageTitle";
import ModalButton from "../utilityComponents/ModalButton";

const ShowCustomerModal = (props) => {
  document.title = props.modal === false ? "Customers" : "Customer Details";

  const id = JSON.parse(localStorage.getItem("Customer_ID"));

  let formikRef = useRef(null);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    id && props.getCustomerById(id);
  }, [id]);

  return (
    <Modal
      title=""
      centered
      // destroyOnClose={true}
      visible={props.modal}
      onCancel={() => {
        localStorage.removeItem("Customer_ID");
        setDisabled(true);

        props.showModal({
          modalType: "SHOW_CUSTOMER",
          modalProps: false,
        });
      }}
      width={500}
      footer={null}
    >
      <Formik
        innerRef={(instance) => {
          formikRef = instance;
        }}
        initialValues={{
          name: props?.customer?.name || "",
          email: props?.customer?.email || "",
          mobile: props?.customer?.mobile || "",
        }}
        enableReinitialize={true}
        // validate={validationSchema}
        onSubmit={(values, { resetForm }) => {
          //   props.createCustomers(values);
          props.updateCustomer(values, id);
          resetForm({ values: "" });
          setDisabled(true);
          props.showModal({
            modalType: "SHOW_CUSTOMER",
            modalProps: false,
          });
          props.getCustomers();
        }}
      >
        {({ handleSubmit, touched, error }) => (
          <Form onSubmit={handleSubmit}>
            <PageTitle
              title={`Customer ${disabled ? "Details" : "Edit"}`}
              btnName="Edit"
              onClick={() => {
                setDisabled(!disabled);
              }}
              btnType={disabled === false && "primary"}
            />

            <div className="form__inputContainer">
              <label>Name</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                  <Field
                    name="name"
                    className="form__inputr"
                    placeholder="Enter You're Full Name"
                    type="text"
                    as={Input}
                    disabled={disabled}
                  />
                )}
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Email</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                  <Field
                    name="email"
                    placeholder="Enter You're Email"
                    type="email"
                    as={Input}
                    disabled={disabled}
                  />
                )}
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Mobile</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                  <Field
                    name="mobile"
                    placeholder="Enter You're Mobile"
                    type="number"
                    as={Input}
                    disabled={disabled}
                  />
                )}
              </div>
            </div>
            <ModalButton
              disabled={disabled}
              onClickClose1={() => {
                localStorage.removeItem("Customer_ID");
                props.showModal({
                  modalType: "SHOW_CUSTOMER",
                  modalProps: false,
                });
              }}
              onClickClose2={() => {
                setDisabled(!disabled);
                localStorage.removeItem("Customer_ID");
                props.showModal({
                  modalType: "SHOW_CUSTOMER",
                  modalProps: false,
                });
              }}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modals.modalProps,
  customer: state.customers.customer,
  loading: state.customers.fetch,
});

export default connect(mapStateToProps, {
  showModal,
  getCustomerById,
  updateCustomer,
  getCustomers,
})(withRouter(ShowCustomerModal));
