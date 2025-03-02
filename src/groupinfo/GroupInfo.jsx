import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import GroupTable from "../utils/GroupTable";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthProvider";

const GroupInfo = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  console.log(email);
  const { data: groups = [], refetch } = useQuery({
    queryKey: [`group`, email],
    queryFn: async () => {
      const res = await axios.get(`https://idk-gray-two.vercel.app/groupInfo/${email}`, { email });
      return res.data;
    },
  });
  console.log(groups);

  return (
    <div>
      <GroupTable groups={groups} refetch={refetch}></GroupTable>
    </div>
  );
};

export default GroupInfo;
