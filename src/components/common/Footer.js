import React from 'react';

function Footer() {
  return (
    <footer className="bg-light p-3 text-center">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Recipe App</p>
      </div>
    </footer>
  );
}

export default Footer;
