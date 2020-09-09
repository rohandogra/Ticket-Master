import React from "react";
import Layout from "../../layouts/Layout";
import './home.scss'

function Dashboard() {
  return (
    <Layout>
      <div className='image__Dashboard text-center'>
        <h1 >Welcome to Ticket Master</h1>
        <img src='imagedash.png' alt='altimg' />
      </div>
    </Layout>
  );
}
export default Dashboard;
