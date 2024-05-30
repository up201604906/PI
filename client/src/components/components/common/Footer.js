import React from 'react';


const Footer = () => {
    return (
        <div>
            <style>
                {`
                    #footer {
                        background: #404040 !important;
                        padding: 30px 0 !important;
                        color: #fff;
                        font-size: 14px;
                    }
                `}
            </style>
            <footer id="footer" className="d-flex flex-wrap justify-content-between align-items-center py-3 px-5 border-top bg-dark">

                <p className="col-md-4 mb-0 mx-auto text-light text-center">© Copyright <b>DIGI2</b>. All rights reserved.</p>

            </footer>
        </div>
    );
}

export default Footer;