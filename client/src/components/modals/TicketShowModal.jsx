import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select, Radio, Spin } from "antd";
import PageTitle from "../utilityComponents/PageTitle";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modalsAction";
import { getCustomers } from "../../redux/actions/customerAction";
import { getDepartments } from "../../redux/actions/departmentAction";
import { getEmployees } from "../../redux/actions/employeeAction";
import { updateTicket, getTicketById } from "../../redux/actions/ticketAction";
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

function TicketShowModal(props) {
  const [departmentSelected, setDepartmentSelected] = useState("");

  const [disabled, setDisabled] = useState(true);

  const ticket_ID = JSON.parse(localStorage.getItem("ticket_ID"));

  const { customers, departments, employees, ticket } = props;

  useEffect(() => {
    props.getCustomers();
    props.getTicketById(ticket_ID);
    props.getDepartments();
    props.getEmployees();
  }, [ticket_ID]);

  const id = departmentSelected === "" ? ticket?.departmentId?._id : departmentSelected;
  const filtredEmployees = employees?.filter(
    (emp) => emp?.department?._id === id
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
          code: ticket.code || "",
          title: ticket.title || "",
          customerId: ticket.customerId?._id || "",
          departmentId: departmentSelected
            ? departmentSelected
            : ticket.departmentId?._id || "",
          employeesIds: !departmentSelected
            ? ticket?.employeesIds?.map((ele) => ele?._id)
            : [],
          message: ticket.message || "",
          priority: ticket.priority || "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          props.updateTicket(ticket_ID, values);
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
            <PageTitle
              title="Add New Ticket"
              btnName="Edit"
              onClick={() => setDisabled(!disabled)}
              btnType={disabled === false && "primary"}
            />
            <div className="form__inputContainer">
              <label>Code</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                    <Field
                      name="code"
                      className="form__inputr"
                      placeholder="Enter Code"
                      type="text"
                      as={Input}
                      disabled={disabled}
                    />
                  )}
                <ErrorMessage
                  name="code"
                  render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                />
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Title</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                    <div>
                      <Field
                        name="title"
                        placeholder="Enter Title"
                        type="text"
                        as={Input}
                        disabled={disabled}
                      />
                      <ErrorMessage
                        name="title"
                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                      />
                    </div>
                  )}
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Customer</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                    <div>
                      <Field name="customerId" validate={validate} fast={fast}>
                        {({
                          field: { value },
                          form: { setFieldValue, setFieldTouched },
                        }) => (
                            <Select
                              disabled={disabled}
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
                              value={
                                value === "" || value === null ? undefined : value
                              }
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
                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                      />
                    </div>
                  )}
              </div>
            </div>
            <div className="form__inputContainer">
              <label>Department</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                    <div>
                      <Field name="departmentId" validate={validate} fast={fast}>
                        {({
                          field: { value },
                          form: { setFieldValue, setFieldTouched },
                        }) => (
                            <Select
                              disabled={disabled}
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
                      <ErrorMessage
                        name="departmentId"
                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                      />
                    </div>
                  )}
              </div>
            </div>

            <div className="form__inputContainer">
              <label>Employees</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                    <div>
                      <Field name="employeesIds" validate={validate} fast={fast}>
                        {({
                          field: { value },
                          form: { setFieldValue, setFieldTouched },
                        }) => (
                            <Select
                              disabled={disabled}
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
                              value={
                                value === "" || value === null ? undefined : value
                              }
                              {...restProps}
                            >
                              {filtredEmployees?.map((element) => (
                                <Option value={element?._id} key={element?._id}>
                                  {element?.name}
                                </Option>
                              ))}
                            </Select>
                          )}
                      </Field>
                      <ErrorMessage
                        name="employeesIds"
                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                      />
                    </div>
                  )}
              </div>
            </div>

            <div className="form__inputContainer">
              <label>Message</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                    <div>
                      <Field
                        disabled={disabled}
                        name="message"
                        placeholder="Enter message"
                        type="text"
                        as={TextArea}
                      />
                      <ErrorMessage
                        name="message"
                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                      />
                    </div>
                  )}
              </div>
            </div>

            <div className="form__inputContainer">
              <label>Priority</label>
              <div className="form__input">
                {props.loading ? (
                  <Spin />
                ) : (
                    <div>
                      <Field name="priority" validate={validate} fast={fast}>
                        {({
                          field: { value },
                          form: { setFieldValue, setFieldTouched },
                        }) => (
                            <Radio.Group
                              disabled={disabled}
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
                        render={(msg) => <div style={{ color: "red", fontSize: '12px', lineHeight: '2', marginBottom: "-20px" }}>{`*${msg}`}</div>}
                      />
                    </div>
                  )}
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
  ticket: state.tickets.ticket,
  loading: state.tickets.fetch,
});

export default connect(mapStateToProps, {
  showModal,
  getTicketById,
  getCustomers,
  getDepartments,
  getEmployees,
  updateTicket,
})(TicketShowModal);
