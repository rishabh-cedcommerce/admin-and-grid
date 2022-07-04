import React, { useState, useCallback, useEffect } from 'react';

import { Checkbox } from '@shopify/polaris';

function CheckBox({ name, handleCheckBox, status }) {
    const [checked, setChecked] = useState(status);

    const handleChange = useCallback((newValue) => { setChecked(newValue) }, []);

    useEffect(() => {
        handleCheckBox(name, checked)
    }, [checked])

    return (
        <Checkbox
            label={name}
            checked={checked}
            onChange={handleChange}
        />
    );
}

export default CheckBox;