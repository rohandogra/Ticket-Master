import React, { useEffect } from "react";
import { showModal } from "../../redux/actions/modalsAction";
import { Table, Button, Checkbox, Tag } from "antd";
import { deleteTicket, updateTicket } from "../../redux/actions/ticketAction";
import ModalConfirm from "../utilityComponents/ConfirmModal";
import { connect } from "react-redux";
import { getDepartments } from "../../redux/actions/departmentAction";

function TicketTable(props) {
  const isChecked = (id, e) => {
    props.updateTicket(id, { isResolved: e.target.checked });
  };

  useEffect(() => {
    props.getDepartments();
  }, []);
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Customer",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Department",
      dataIndex: "departmentId",
      key: "departmentId",
      filters: props.department.map((ele) => ({
        text: ele.name,
        value: ele.name,
      })),
      onFilter: (value, record) => record.departmentId.includes(value),
    },
    {
      title: "Employees",
      dataIndex: "employeesIds",
      key: "employeesIds",
      render: (employeesIds) => (
        <>
          {employeesIds.map((tag) => {
            const color = "volcano";

            return (
              <Tag color={color} key={tag._id}>
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: [
        { text: "high", value: "high" },
        { text: "medium", value: "medium" },
        { text: "low", value: "low" },
      ],
      onFilter: (value, record) => record.priority.includes(value),
    },
    {
      title: "Resolved",
      dataIndex: "isResolved",
      key: "isResolved",
      render: (record) => (
        <div>
          <Checkbox
            style={{ paddingLeft: "15%" }}
            defaultChecked={record.state}
            onChange={(e) => isChecked(record.id, e)}
          ></Checkbox>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (record) => (
        <div className="customer__ActionButtonContainer">
          <Button
            onClick={() => {
              localStorage.setItem("ticket_ID", JSON.stringify(record));
              props.showModal({
                modalType: "SHOW_TICKET",
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
              props.deleteTicket(record);
            }}
          />
        </div>
      ),
    },
  ];

  const EmployeesData = props.pending?.map((ticket) => ({
    key: ticket?._id,
    code: ticket?.code,
    title: ticket?.title,
    customerId: ticket?.customerId?.name,
    departmentId: ticket.departmentId?.name,
    employeesIds: ticket.employeesIds.map((emp) => emp),
    priority: ticket.priority,
    isResolved: { id: ticket._id, state: ticket.isResolved },
    action: ticket._id,
  }));

  const EmployeesDataCompleted = props.completed?.map((ticket) => ({
    key: ticket?._id,
    code: ticket?.code,
    title: ticket?.title,
    customerId: ticket?.customerId?.name,
    departmentId: ticket.departmentId?.name,
    employeesIds: ticket?.employeesIds?.map((emp) => emp),
    priority: ticket?.priority,
    isResolved: { id: ticket?._id, state: ticket?.isResolved },
    action: ticket?._id,
  }));

  return (
    <div>
      {props.current === "Pending" ? (
        <Table
          dataSource={EmployeesData}
          loading={props.loading}
          columns={columns}
          pagination={false}
        />
      ) : (
          <Table
            dataSource={EmployeesDataCompleted}
            loading={props.loading}
            columns={columns}
            pagination={false}
          />
        )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  modal: state.modals,
  tickets: state.tickets.tickets,
  loading: state.tickets.loading,
  department: state.department.department,
});

export default connect(mapStateToProps, {
  showModal,
  updateTicket,
  getDepartments,
  deleteTicket,
})(TicketTable);
