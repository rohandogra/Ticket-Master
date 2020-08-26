import React, { useEffect, useState, Children } from "react";
import { Modal, Input, Button, Select, Radio } from "antd";
import PageTitle from "../utilityComponents/PageTitle";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modalsAction";
import { getCustomers } from "../../redux/actions/customerAction";
import { getDepartments } from "../../redux/actions/departmentAction";
import { getEmployees } from "../../redux/actions/employeeAction";
import { createTicket } from "../../redux/actions/ticketAction";
import * as Yup from "yup";

const { Option } = Select;
const { TextArea } = Input;
const validationSchema = Yup.object().shape({
  code: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  customerId: Yup.string().required("Required"),
  departmentId: Yup.string().required("Required"),
  employeesIds: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
  priority: Yup.string().required("Required"),
});

function TicketAddModal(props) {
  const [departmentSelected, setDepartmentSelected] = useState("");

  const { customers, departments, employees } = props;

  useEffect(() => {
    props.getCustomers();
    props.getDepartments();
    props.getEmployees();
  }, []);

  const filtredEmployees = employees.filter(
    (emp) => emp.department._id == departmentSelected
  );

  return (
    <Modal
      title=""
      centered
      destroyOnClose
      visible={props.modal}
      onCancel={() => {
        props.showModal({
          modalType: "ADD_TICKET",
          modalProps: false,
        });
      }}
      width={500}
      footer={null}
    >
      <Formik
        initialValues={{
          code: "",
          title: "",
          customerId: "",
          departmentId: "",
          employeesIds: [],
          message: "",
          priority: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          props.createTicket(values);
          resetForm();
          props.showModal({
            modalType: "ADD_TICKET",
            modalProps: false,
          });
        }}
      >
        {({ onChange, onBlur, restProps, validate, fast }) => (
          <Form>
            {/* <div className="form__headerText">Add Customer</div> */}
            <PageTitle title="Add Ticket" />
            <div className="form__inputContainer">
              <label>Code</label>
              <div className="form__input">
                <Field
                  name="code"
                  className="form__inputr"
                  placeholder="Enter Code"
                  type="number"
                  as={Input}
                />
                <ErrorMessage
                  name="code"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Title</label>
              <div className="form__input">
                <Field
                  name="title"
                  placeholder="Enter Title"
                  type="text"
                  as={Input}
                />
                <ErrorMessage
                  name="title"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Customer</label>
              <div className="form__input">
                <Field name="customerId" validate={validate} fast={fast}>
                  {({
                    field: { value },
                    form: { setFieldValue, setFieldTouched },
                  }) => (
                    <Select
                      style={{ width: "100% " }}
                      onChange={(value, option) => {
                        setFieldValue("customerId", value);
                        onChange && onChange(value, option);
                      }}
                      onBlur={(value) => {
                        setFieldTouched("customerId");
                        onBlur && onBlur(value);
                      }}
                      placeholder="Select Customer"
                      // setting undefined will show the placeholder
                      value={value === "" || value === null ? undefined : value}
                      {...restProps}
                    >
                      {customers &&
                        customers?.map((cust) => (
                          <Option value={cust._id} key={cust._id}>
                            {cust.name}
                          </Option>
                        ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="customerId"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Department</label>
              <div className="form__input">
                <Field name="departmentId" validate={validate} fast={fast}>
                  {({
                    field: { value },
                    form: { setFieldValue, setFieldTouched },
                  }) => (
                    <Select
                      style={{ width: "100% " }}
                      onChange={(value, option) => {
                        setFieldValue(
                          "departmentId",
                          value,
                          setDepartmentSelected(value)
                        );
                        onChange && onChange(value, option);
                      }}
                      onBlur={(value) => {
                        setFieldTouched("departmentId");
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
                <ErrorMessage
                  name="departmentId"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </div>
            </div>

            <div className="form__inputContainer">
              <label>Employees</label>
              <div className="form__input">
                <Field name="employeesIds" validate={validate} fast={fast}>
                  {({
                    field: { value },
                    form: { setFieldValue, setFieldTouched },
                  }) => (
                    <Select
                      mode="multiple"
                      style={{ width: "100% " }}
                      onChange={(value, option) => {
                        setFieldValue("employeesIds", value);
                        onChange && onChange(value, option);
                      }}
                      onBlur={(value) => {
                        setFieldTouched("employeesIds");
                        onBlur && onBlur(value);
                      }}
                      placeholder="Select Employees"
                      // setting undefined will show the placeholder
                      value={value === "" || value === null ? undefined : value}
                      {...restProps}
                    >
                      {filtredEmployees.map((element) => (
                        <Option value={element._id} key={element._id}>
                          {element.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="employeesIds"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </div>
            </div>

            <div className="form__inputContainer">
              <label>Message</label>
              <div className="form__input">
                <Field
                  name="message"
                  placeholder="Enter message"
                  type="text"
                  as={TextArea}
                />
                <ErrorMessage
                  name="message"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                />
              </div>
            </div>

            <div className="form__inputContainer">
              <label>Priority</label>
              <div className="form__input">
                <Field name="priority" validate={validate} fast={fast}>
                  {({
                    field: { value },
                    form: { setFieldValue, setFieldTouched },
                  }) => (
                    <Radio.Group
                      value={value}
                      onChange={(event) => {
                        setFieldValue("priority", event.target.value);
                        setFieldTouched("priority", true, false);
                        onChange && onChange(event);
                      }}
                      {...restProps}
                    >
                      <Radio value={"high"}>High</Radio>
                      <Radio value={"medium"}>Medium</Radio>
                      <Radio value={"low"}>Low</Radio>
                    </Radio.Group>
                  )}
                </Field>
                <ErrorMessage
                  name="priority"
                  render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
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
                    modalType: "ADD_TICKET",
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
  customers: state.customers.customers,
  departments: state.department.department,
  employees: state.employee.employees,
});

export default connect(mapStateToProps, {
  showModal,
  getCustomers,
  getDepartments,
  getEmployees,
  createTicket,
})(TicketAddModal);
