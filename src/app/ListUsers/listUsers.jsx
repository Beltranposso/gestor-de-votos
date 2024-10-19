import React from 'react';
import Layout from '../../components/layouts/Header'
import List from './Content'
const ListUsers = () => {
    return (
        <Layout Component={<List/>}></Layout>
    );
};

export default ListUsers;
