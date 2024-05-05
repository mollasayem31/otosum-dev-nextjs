import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const page = () => {
  return (
    <>
      <div className=" grid grid-cols-2 grid-flow-col mx-5">
        <div className="">
          <ItemsList />
        </div>
        <div className="">
          <OrderSystem />
        </div>
      </div>
    </>
  );
};
export default page;
