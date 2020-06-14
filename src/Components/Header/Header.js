import React from 'react'
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './header.css'

function Header(props) {
    const menu =(
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" className="text-color-white" onClick={()=>props.changeLang('en')}>
                    English
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" className="text-color-white" onClick={()=>props.changeLang('de')}>
                    Deutsche
                </a>
            </Menu.Item>
        </Menu>
    )
    return (
        <div style={{background: '#1F2640', width: '100%', fontFamily: 'Roboto'}}>
            <div className="header">
                <img src={require('../../images/bs-logo-new.png')} alt="BlueStacks" title="BlueStacks" height = "50" style={{cursor: 'pointer'}} />
                <button className="dropdown-button-style">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link dropdown" style={{color: 'white'}} onClick={e => e.preventDefault()}>
                            {props.lang === 'en'? 'English': 'Deutsche'}
                         <DownOutlined />
                        </a>
                    </Dropdown>
                </button>
            </div>
        </div>
    )
}

export default Header
