import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const MenuList = styled.ul`
    display: flex;
    justify-content: space-around;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
`;

const MenuItem = styled.li`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    color: ${(props) => (props.active ? 'black' : 'gray')};

    &:focus {
        outline: none;
    }

    @media (max-width: 768px) {
        font-size: 11px;
    }
`;

const SvgIcon = styled.svg`
    width: 24px;
    height: 24px;
    margin-bottom: 5px;

    fill: ${(props) => (props.active ? 'black' : 'none')};
    stroke: ${(props) => (props.active ? 'black' : 'gray')};
    stroke-width: 2;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
        margin-bottom: 4px;
    }
`;

const Navbar = () => {
    const menuList = [
        { name: 'Home', path: '/main', svgPath: <path d="M3 12l9-9 9 9M4 10v10h5v-6h6v6h5V10" /> },
        { 
            name: 'Scheduler', 
            path: '/scheduler', 
            svgPath: (
                <>
                    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                    <path d="M8 2v4M16 2v4M3 10h18" />
                </>
            ) 
        },
        { 
            name: 'Ranking', 
            path: '/ranking', 
            svgPath: (
                <>
                    <path d="M3 20v-6h4v6H3z" />
                    <path d="M10 20V10h4v10h-4z" />
                    <path d="M17 20v-4h4v4h-4z" />
                </>
            ) 
        },
        { name: 'My', path: '/mypage', svgPath: <path d="M12 2a5 5 0 015 5v2a5 5 0 01-10 0V7a5 5 0 015-5zm0 14c-5.33 0-8 2.67-8 5v2h16v-2c0-2.33-2.67-5-8-5z" /> },
    ];

    const [activeMenu, setActiveMenu] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentMenu = menuList.find((menu) => menu.path === location.pathname);
        if (currentMenu) {
            setActiveMenu(currentMenu.name);
        }
    }, [location.pathname, menuList]);

    return (
        <NavbarContainer>
            <MenuList>
                {menuList.map((menu, index) => (
                    <MenuItem
                        key={index}
                        active={activeMenu === menu.name}
                        onClick={() => {
                            setActiveMenu(menu.name);
                            navigate(menu.path);
                        }}
                    >
                        <SvgIcon
                            active={activeMenu === menu.name}
                            viewBox="0 0 24 24"
                        >
                            {menu.svgPath}
                        </SvgIcon>
                        {menu.name}
                    </MenuItem>
                ))}
            </MenuList>
        </NavbarContainer>
    );
};

export default Navbar;