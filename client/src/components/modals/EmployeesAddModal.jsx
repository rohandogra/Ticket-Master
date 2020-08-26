import React, { useEffect } from "react";
import { Modal, Input, Button, Select } from "antd";
import PageTitle from "../utilityComponents/PageTitle";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modalsAction";
import { createEmployees } from "../../redux/actions/employeeAction";
import { getDepartments } from "../../redux/actions/departmentAction";
import * as Yup from "yup";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

function EmployeesAddModal(props) {
  const { departments } = props;

  useEffect(() => {
    props.getDepartments();
  }, []);

  return (
    <Modal
      title=""
      centered
      destroyOnClose
      visible={props.modal}
      onCancel={() => {
        props.showModal({
          modalType: "ADD_EMPLOYEE",
          modalProps: false,
        });
      }}
      width={500}
      footer={null}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          mobile: "",
          department: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          props.createEmployees(values);
          resetForm();
          props.showModal({
            modalType: "ADD_EMPLOYEE",
            modalProps: false,
          });
        }}
      >
        {({ onChange, onBlur, restProps, validate, fast }) => (
          <Form>
            {/* <div className="form__headerText">Add Customer</div> */}
            <PageTitle title="Add Employee" />
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
                <ErrorMessage
                  name="name"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
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
            <div className="form__inputContainer">
              <label>Department</label>
              <div className="form__input">
                <Field name="department" validate={validate} fast={fast}>
                  {({
                    field: { value },
                    form: { setFieldValue, setFieldTouched },
                  }) => (
                    <Select
                      style={{ width: "100% " }}
                      onChange={(value, option) => {
                        setFieldValue("department", value);
                        onChange && onChange(value, option);
                      }}
                      onBlur={(value) => {
                        setFieldTouched("department");
                        onBlur && onBlur(value);
                      }}
                      placeholder="Select Department"
                      // setting undefined will show the placeholder
                      value={value === "" || value === null ? undefined : value}
                      {...restProps}
                    >
                      {departments.map((dep) => (
                        <Option value={dep._id} key={dep._id}>
                          {dep.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Field>
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
                    modalType: "ADD_EMPLOYEE",
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
  departments: state.department.department,
});

export default connect(mapStateToProps, {
  showModal,
  createEmployees,
  getDepartments,
})(EmployeesAddModal);
