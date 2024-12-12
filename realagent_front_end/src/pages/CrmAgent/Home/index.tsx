/* eslint-disable react-hooks/exhaustive-deps */
import { Flex } from "@mantine/core";
import React from "react";
import CustomerListTable from "../../../components/Card/CustomerListCard";

const CrmHome: React.FC = () => {

  return (

    <Flex direction={"column"} gap={"5.5px"}>
      <Flex bg={"#FFFFFF"}>
        <CustomerListTable />
      </Flex>
    </Flex>


  );
};

export default CrmHome;
