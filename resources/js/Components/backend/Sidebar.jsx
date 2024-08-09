import React from 'react'
import { Sidebar,SubMenu,MenuItem,Menu } from 'react-pro-sidebar'

const BmsSidebar = () => {
  return (
    <Sidebar style={{borderRight:'2px solid black',padding:'10px'}}>
    <Menu>
        <MenuItem>Dashboard</MenuItem>
        <SubMenu label="Groups">
            <MenuItem> Admin </MenuItem>
            <MenuItem> Staffs </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
    </Menu>
</Sidebar>
  )
}

export default BmsSidebar