import React from 'react';
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('查看文章列表', 'list', <ReadOutlined />),
    getItem('文章编辑', 'edit', <EditOutlined />),
    getItem('修改资料', 'means', <DatabaseOutlined />)
];

export default function Aside() {
    const navigate = useNavigate()

    const onClick = (e) => {
        navigate('/' + e.key);
    };

    return (
        <Menu
            onClick={onClick}
            style={{ width: 160 }}
            defaultSelectedKeys={['list']}
            mode="inline"
            theme='dark'
            className='aside'
            items={items}
        />
    )
}