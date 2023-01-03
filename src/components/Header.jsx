import React, { useEffect, useState } from "react"
import logoImg from '../assets/images/logo.png'
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Space, message } from 'antd';
import defaultAvatar from '../assets/images/defaultAvatar.png'
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [username, setUsername] = useState("用户")
    const navigate = useNavigate()

    useEffect(() => {
        let username1 = localStorage.getItem('username')
        let avatar1 = localStorage.getItem('avatar')

        if (username1) {
            setUsername(username1)
        }

        if (avatar1) {
            setAvatar('http://47.93.114.103:6688/' + avatar1)
        }

    }, [])

    const onClick = ({ key }) => {
        if (key == 2) {
            message.success('退出成功, 即将返回登录页')
            localStorage.clear();
            setTimeout(()=>navigate('./login'), 1500)
        }
    };

    const items = [
        {
            key: '1',
            label: '修改资料'
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: '退出登录',
        },
    ];

    return (
        <header>
            <img src={logoImg} alt="" className='logo' />
            <div className="right">
                <Dropdown menu={{ items, onClick }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <img src={avatar} className="avatar" alt="" />
                            <span>{username}</span>
                            <CaretDownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}