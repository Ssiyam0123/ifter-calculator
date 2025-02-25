import axios from "axios";
import React, { useEffect, useState } from "react";
import GroupTable from "../utils/GroupTable";
import { useQuery } from "@tanstack/react-query";

const GroupInfo = () => {
  const { data: groups = [] } = useQuery({
    queryKey: [`group`],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/groupInfo");
      return res.data;
    },
  });
  console.log(groups)

  return (
    <div>
      <GroupTable groups={groups}></GroupTable>
    </div>
  );
};

export default GroupInfo;
