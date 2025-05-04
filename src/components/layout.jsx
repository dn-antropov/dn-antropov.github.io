import React from 'react';
import Header from './header';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
			<Header />
			<div cassName='content'>
				<main> <Outlet /></main>
			</div>
			<Footer />
    </>
  );
};

export default Layout;