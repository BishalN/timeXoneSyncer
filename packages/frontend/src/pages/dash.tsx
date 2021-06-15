import React from "react";
import client from "../apolloClient";
import { gql } from "@apollo/client";

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Me {
        me {
          username
          email
          profilePicture
        }
      }
    `,
  });

  return {
    props: {
      me: data,
    },
  };
}

function dash({ me }) {
  console.log(me);
  return <div>welcome to the dash bro</div>;
}

export default dash;
