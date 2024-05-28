import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} FoodExpress Delivery App. All Rights Reserved.</p>
    </footer>
  );
};

// Inline CSS styles
const footerStyle = {
  backgroundColor: '#f8f8f8',
  padding: '10px',
  textAlign: 'center',
};

export default Footer;
