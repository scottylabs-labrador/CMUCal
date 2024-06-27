import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadFile, UploadLink, UploadManually } from "../components/UploadOptions";

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const UploadAcademics: React.FC = () => {
    // const [page, setPage] = useState("file");
    const [tabNum, setTabNum] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newTabNum: number) => {
        setTabNum(newTabNum);
      };
    
    return (
        <div className="text-center">
            <h2>Upload Academics</h2>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={tabNum} onChange={handleChange} centered>
                    <Tab label="Upload File" />
                    <Tab label="Upload Link" />
                    <Tab label="Upload Manually" />
                </Tabs>
            </Box>
            {tabNum == 0 && <UploadFile from="academics"/>}
            {tabNum == 1 && <UploadLink from="academics"/>}
            {tabNum == 2 && <UploadManually from="academics"/>}

        </div>
    )
}

export {UploadAcademics};