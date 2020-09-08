import React, { useEffect, useState } from "react";
import { Modal, Input, Spin } from "antd";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modalsAction";
import { withRouter } from "react-router-dom";
import {
  getCustomerById,
  updateCustomer,
  getCustomers,
} from "../../redux/actions/customerAction";
import { Formik, Field, Form, ErrorMessage } from "formik";
import PageTitle from "../utilityComponents/PageTitle";
import ModalButton from "../utilityComponents/ModalButton";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  mobile: Yup.number()
    .required("Required")
});

const ShowCustomerModal = (props) => {
  document.title = props.modal === false ? "Customers" : "Customer Details";

  const id = JSON.parse(localStorage.getItem("Customer_ID"));

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
        initialValues={{
          name: props?.customer?.name || "",
          email: props?.customer?.email || "",
          mobile: props?.customer?.mobile || "",
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
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
                    <div>
                      <Field
                        name="name"
                        className="form__inputr"
                        placeholder="Enter You're Full Name"
                        type="text"
                        as={Input}
                        disabled={disabled}
                      />
                      <ErrorMessage
                        name="name"
                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                      />
                    </div>
                  )}
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Email</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                    <div>
                      <Field
                        name="email"
                        placeholder="Enter You're Email"
                        type="email"
                        as={Input}
                        disabled={disabled}
                      />
                      <ErrorMessage
                        name="email"
                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                      />
                    </div>
                  )}
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Mobile</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                    <div>
                      <Field
                        name="mobile"
                        placeholder="Enter You're Mobile"
                        type="number"
                        as={Input}
                        disabled={disabled}
                      />
                      <ErrorMessage
                        name="mobile"
                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                      />
                    </div>
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
