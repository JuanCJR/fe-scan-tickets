import React from "react";
import { Spinner } from "react-bootstrap";
export const OnLoadSpinner = (props: any) => {
  const { onLoad } = props;

  if (onLoad) {
    return <Spinner animation="grow" />;
  } else {
    return <React.Fragment></React.Fragment>;
  }
};
