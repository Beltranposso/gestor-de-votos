
import React from 'react';
import Home from './content'
import Layout from '../../components/layouts/Header'

const HomeLayout = () => {
const Estado = localStorage.getItem('token')


    return (
       <Layout Component={<Home/>}></Layout>
       
    );
};

export default HomeLayout;
 