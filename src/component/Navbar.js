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

const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin-bottom: 5px;

    /* 활성화 상태에 따라 아이콘 색상 변경 */
    filter: ${(props) => (props.active ? 'grayscale(0%)' : 'grayscale(100%)')};
    opacity: ${(props) => (props.active ? 1 : 0.6)};

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
        margin-bottom: 4px;
    }
`;

const Navbar = () => {
    const menuList = [
        { name: '스케줄러', path: '/scheduler', image: 'https://cdn-icons-png.flaticon.com/512/6752/6752472.png' },
        { name: '공부방', path: '/studyroom', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn31u9kl9f1eShHiJqdX3ICWmD6h5I5AYplA&s' },
        { name: '홈', path: '/main', image: 'https://cdn-icons-png.flaticon.com/512/66/66760.png' },
        { name: '랭킹', path: '/ranking', image: 'https://cdn-icons-png.flaticon.com/512/81/81632.png' },
        { name: '마이', path: '/mypage', image: 'https://cdn-icons-png.flaticon.com/512/1358/1358034.png' },
    ];
    const [activeMenu, setActiveMenu] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentMenu = menuList.find(menu => menu.path === location.pathname);
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
                        <Icon 
                            src={menu.image} 
                            alt={`${menu.name} icon`} 
                            active={activeMenu === menu.name} 
                        />
                        {menu.name}
                    </MenuItem>
                ))}
            </MenuList>
        </NavbarContainer>
    );
};

export default Navbar;
