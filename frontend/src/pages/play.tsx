import React, { useEffect } from "react";
import { withApollo } from "../utils/withApollo";

const play = () => {
  return <h1>this is awesome page</h1>;
};

export default withApollo({ ssr: true })(play);
