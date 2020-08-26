import React, { useEffect, useState } from "react";
import { Modal, Input, Spin, Select } from "antd";
import PageTitle from "../utilityComponents/PageTitle";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modalsAction";
import {
  updateEmployees,
  EmployeeById,
} from "../../redux/actions/employeeAction";
import { getDepartments } from "../../redux/actions/departmentAction";
import * as Yup from "yup";
import ModalButton from "../utilityComponents/ModalButton";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

function EmployeesShowModal(props) {
  const { departments, employee } = props;
  const EmployeeID = JSON.parse(localStorage.getItem("Employee_ID"));
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (EmployeeID) {
      return props.EmployeeById(EmployeeID), props.getDepartments();
    }
  }, [EmployeeID]);

  return (
    <Modal
      title=""
      centered
      destroyOnClose
      visible={props.modal}
      onCancel={() => {
        props.showModal({
          modalType: "SHOW_EMPLOYEE",
          modalProps: false,
        });
      }}
      width={500}
      footer={null}
    >
      <Formik
        initialValues={{
          name: employee.name || "",
          email: employee.email || "",
          mobile: employee.mobile || "",
          department: employee?.department?._id || "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          props.updateEmployees(EmployeeID, values);
          resetForm();
          setDisabled(true);
          //   props.showModal({
          //     modalType: "SHOW_EMPLOYEE",
          //     modalProps: false,
          //   });
        }}
      >
        {({ onChange, onBlur, restProps, validate, fast }) => (
          <Form>
            {/* <div className="form__headerText">Add Customer</div> */}
            <PageTitle
              title="Employee Details"
              btnName="Edit"
              onClick={() => setDisabled(!disabled)}
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
                <ErrorMessage
                  name="name"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
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
            <div className="form__inputContainer">
              <label>Department</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
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
                        disabled={true}
                        onBlur={(value) => {
                          setFieldTouched("department");
                          onBlur && onBlur(value);
                        }}
                        placeholder="Select Department"
                        // setting undefined will show the placeholder
                        value={
                          value === "" || value === null ? undefined : value
                        }
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
                )}
              </div>
            </div>

            <ModalButton
              disabled={disabled}
              onClickClose1={() => {
                localStorage.removeItem("Employee_ID");
                props.showModal({
                  modalType: "SHOW_EMPLOYEE",
                  modalProps: false,
                });
              }}
              onClickClose2={() => {
                setDisabled(!disabled);
                localStorage.removeItem("Employee_ID");
                props.showModal({
                  modalType: "SHOW_EMPLOYEE",
                  modalProps: false,
                });
              }}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  modal: state.modals.modalProps,
  departments: state.department.department,
  employee: state.employee.employee,
  loading: state.employee.fetch,
});

export default connect(mapStateToProps, {
  showModal,
  EmployeeById,
  getDepartments,
  updateEmployees,
})(EmployeesShowModal);
