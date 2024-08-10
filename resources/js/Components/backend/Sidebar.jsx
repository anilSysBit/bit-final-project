import { asset } from '@/helpers/asset'
import { Bloodtype, Dashboard, Group, VerifiedUser } from '@mui/icons-material'
import React, { useState } from 'react'
import { Sidebar,SubMenu,MenuItem,Menu,menuClasses } from 'react-pro-sidebar'
import { Link } from '@inertiajs/react'


const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#034456',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

const sideBarData =[
  {
    name:'Dashboard',
    subChildren:null,
    link:'',
    icon:<Dashboard/>
  },

  {
    name:'Groups',
    icon:<Group/>,
    subChildren:[
      {
        name:'Admin',
        subChildren:null,
        link:'',
      },
      {
        name:'staff',
        subChildren:null,
        link:'',
      }
    ],
  },
  {
    name:'Blood',
    icon:<Bloodtype/>,
    subChildren:[
      {
        name:'View List',
        subChildren:null,
        link:'blood.list',
      },
      {
        name:'Create a Request',
        subChildren:null,
        link:'',
      },
    ],
  },

  {
    name:'Users',
    icon:<VerifiedUser/>,
    subChildren:[
      {
        name:'View List',
        subChildren:null,
        link:'',
      },
      {
        name:'Create a User',
        subChildren:null,
        link:'',
      },
    ],
  },
  {
    name:'Dashboard',
    subChildren:null,
    link:'dashboard',
    icon:<Dashboard/>
  }
]

// hex to rgba converter
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const BmsSidebar = () => {
  const [theme,setTheme] = useState('light');
  const [hasImage,setHasImage] = useState(false)


  const menuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0
        ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
        : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };
  return (
    <Sidebar className='rounded h-full' 
    // image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
    backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
    rootStyles={{
      color: themes[theme].sidebar.color,
    }}>
    <Menu menuItemStyles={menuItemStyles} className='mt-5'>
        {sideBarData?.map((elem,index)=>{
          if(elem?.subChildren && elem?.subChildren.length > 0){
            return(
              <SubMenu label={elem?.name} icon={elem?.icon}>
                {elem?.subChildren?.map((item,index)=>(
                  <MenuItem component={item.link ? <Link href={route(item.link)}/> : <Link href={'/dashboard'}/>}>{item?.name}</MenuItem>
                ))}
            </SubMenu>
            )
          }else{
            return(
              <MenuItem component={<Link href={route('dashboard')} />} icon={elem?.icon}>{elem?.name}</MenuItem>
            )
          }
        })}
    </Menu>
</Sidebar>
  )
}

export default BmsSidebar