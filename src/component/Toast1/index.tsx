import { Toast } from "react-bootstrap";
import toast from "react-hot-toast";
import { IToast, toastTypes } from "./types";

import checkSign from "./icons/checkSign.png";
import crossSign from "./icons/crossSign.png";
import warnSign from "./icons/warn.png";
import infoSign from "./icons/info.png";

const image: { [type in toastTypes]: string } = {
  [toastTypes.success]: checkSign,
  [toastTypes.danger]: crossSign,
  [toastTypes.info]: infoSign,
  [toastTypes.warning]: warnSign,
};

const Example: React.FC<IToast> = ({ type, title, description }) => (
  <>
    {toast.custom((t) => (
      <Toast
        bg={type}
        onClose={() => toast.dismiss(t.id)}
        show={t.visible}
        autohide
      >
        <Toast.Header closeVariant="white" className="bg-dark">
          <img
            className="rounded me-2"
            src={image[type]}
            style={{ height: "20px", width: "20px" }}
            alt={type}
          />
          <strong className={`me-auto text-${type}`}>{title}</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body className={`text-light`}>{description}.</Toast.Body>
      </Toast>
    ))}
  </>
);
export default Example;
