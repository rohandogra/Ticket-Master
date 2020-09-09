import React from "react";
import { PageHeader, Button } from "antd";
import "./PageTitle.scss";

function PageTitle(props) {
  return (
    <div>
      <div className="row">
        <PageHeader
          className="modal__pageHeader order-sm-1"
          onBack={props.onBack ? props.onBack : false}
          title={props.title}
          subTitle={props.subTitle}
          tags={props.tags}
          extra={props.extra}
        />
        {props.btnName ? (
          <div className="modal__btn order-sm-2 mx-auto">
            <Button type={props.btnType} onClick={props.onClick}>
              {props.btnName}
            </Button>
          </div>
        ) : null}
      </div>
      <hr />
    </div>
  );
}

export default PageTitle;
