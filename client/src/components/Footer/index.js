import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        <h4 className='footer-font'>&copy; {new Date().getFullYear()} - World Gospel Ministries</h4><br/>
      </div>
    </footer>
  );
};

export default Footer;
