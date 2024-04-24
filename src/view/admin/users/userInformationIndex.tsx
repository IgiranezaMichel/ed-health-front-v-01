import { CollectionsBookmark, PersonPin, Work } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { useState } from 'react';
import UserInformationDetail from './userInformationDetail';

export default function UserInformation(props:{userId:number}) {
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event;
        setValue(newValue);
    }
  return (
    <div>
      <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label={<PersonPin/>} value="1" />
                                <Tab label={<Work/>} value="2" />
                                <Tab label={<CollectionsBookmark/>} value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><UserInformationDetail userId={props.userId}/></TabPanel>
                        <TabPanel value="2"><Work/></TabPanel>
                        <TabPanel value="3"><Work/></TabPanel>
                    </TabContext>
      </Box>
    </div>
  )
}
