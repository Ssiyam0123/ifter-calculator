import axios from "axios";
import React, { useEffect, useState } from "react";
import GroupTable from "../utils/GroupTable";

const GroupInfo = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const { data } = await axios.get("http://localhost:5000/groupInfo");
    setInfo(data)
    console.log(data)
  };

  return(
    <div>
        {/* {
            info.map((group)=><GroupTable key={group._id} 
            groups={group}></GroupTable>)
        } */}
        <GroupTable groups={info}></GroupTable>
    </div>
  )
};

export default GroupInfo;
