import React, { useState, useCallback,useEffect } from 'react';

import { Select } from '@shopify/polaris';

function Range({handleRange}) {
    const [selected, setSelected] = useState("10");

    const handleSelectChange =useCallback((newValue)=>setSelected(newValue),[]);

    useEffect(()=>{
        handleRange(selected);
    },[selected]);

    const options = [
        { label: "10", value: "10" },
        { label: "20", value: "20" },
        { label: "40", value: "40" },
    ];

    return (
        <Select
            // label="Date range"
            options={options}
            onChange={handleSelectChange}
            value={selected}
        />
    );
}

export default Range;