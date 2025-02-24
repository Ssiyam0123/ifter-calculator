import React, { useEffect, useState } from 'react';
import Time from '../utils/Time';
import CreateGroupFrom from '../utils/CreateGroupFrom';

const Calculator = () => {


  return (
    <div>
        <Time/>
        <p>lets make a group</p>
        <CreateGroupFrom/>
    </div>

  );
};

export default Calculator;
