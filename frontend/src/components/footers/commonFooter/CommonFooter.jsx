import React from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;
const CommonFooter = () => {
    return (
        <Footer style={{textAlign: 'center', backgroundColor: 'white'}}>
            Copyright &copy; 2024 ABC Laboratories. Inc. All Rights Reserved.
        </Footer>
    );
};

export default CommonFooter;
