import React from "react";
import { Button } from "antd";
function ModalButton(props) {
  return (
    <div className="form__btn">
      {props.disabled ? (
        <Button
          className="modal__close"
          onClick={props.onClickClose1}
          type="primary"
        >
          Close
        </Button>
      ) : (
        <div className="modal__btn">
          <Button className="modal__submit" htmlType="submit">
            Submit
          </Button>
          <Button
            className="modal__close"
            onClick={props.onClickClose2}
            type="primary"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}

export default ModalButton;
