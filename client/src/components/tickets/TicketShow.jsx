import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import PageTitle from "../utilityComponents/PageTitle";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modalsAction";
import { getTickets } from "../../redux/actions/ticketAction";
import { Tabs } from "antd";
import TicketTable from "./TicketTable";
const { TabPane } = Tabs;

function TicketShow(props) {
  const { tickets } = props;
  useEffect(() => {
    document.title = "Tickets";
    if (tickets.length === 0) props.getTickets();
  }, []);

  const Pending = props.tickets.filter((ticket) => ticket.isResolved === false);
  const Completed = props.tickets.filter(
    (ticket) => ticket.isResolved === true
  );
  return (
    <Layout>
      <PageTitle
        title="Tickets"
        onBack={() => props.history.push("/")}
        btnName="Add New Ticket"
        onClick={() => {
          props.showModal({
            modalType: "ADD_TICKET",
            modalProps: true,
          });
        }}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab={`Pending ${Pending.length}`} key="Pending">
          <TicketTable
            current="Pending"
            pending={Pending}
            all={props.tickets}
          />
        </TabPane>
        <TabPane tab={`Completed ${Completed.length}`} key="Completed">
          <TicketTable current="Completed" completed={Completed} />
        </TabPane>
      </Tabs>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  modal: state.modals.modalProps,
  tickets: state.tickets.tickets,
});

export default connect(mapStateToProps, { showModal, getTickets })(TicketShow);
