/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const CommonFooter = () => {
    return (
        <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
            Copyright &copy; 2024 ABC Laboratories. Inc. All Rights Reserved.
        </Footer>
    );
};

export default CommonFooter;
