import React from 'react';
import './assets/css/main.css'

const Header: React.FC = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <header>
                    <div className="logo">
                        <h1>ByteReads</h1>
                    </div>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/all-books">All Books</a>
                        <a href="/user-acc">User Account</a>
                    </nav>
                </header>
            </div>
        </>
    );
};

export default Header;
