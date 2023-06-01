import { useEffect } from "react";
import { useState } from "react";

export default function CustomAlert({ message, type, closeCallback }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      closeCallback();
    }, 3000);
  }, []);

  return show ? (
    <div className="fixed-top p-3">
      <div
        className={`alert alert-${type} alert-dismissible fade show d-inline-block w-auto`}
        role="alert">
        {message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={closeCallback}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
