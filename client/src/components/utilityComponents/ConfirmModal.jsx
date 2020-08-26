import React from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ModalConfirm = (props) => {
  const handleDelete = () => {
    Modal.confirm({
      title: props.title,
      icon: <ExclamationCircleOutlined />,
      // content: "Bla bla ...",
      okText: "Ok",
      cancelText: "Cancle",
      onOk: props.onOk,
    });
  };

  return (
    <Button type={props.btnType} onClick={handleDelete}>
      {props.btnName}
    </Button>
  );
};

export default ModalConfirm;
