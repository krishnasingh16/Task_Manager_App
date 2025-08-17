import React from 'react';
import highlight from '../assets/highligt.svg';
import '../assets/style.css';
import favicon from '../assets/favicon.png'


const WelcomePage = () => {
  return (
    <section>
      <div className="main_pages">
        <div className="icon_img">
          <img src={highlight} alt="" className="highlighted highlight-1" />
          <img src={highlight} alt="" className="highlighted highlight-2" />
          <img src={highlight} alt="" className="highlighted highlight-3" />
          <img src={highlight} alt="" className="highlighted highlight-4" />
        </div>

        <img src={favicon} alt='' className='h-[100px]'/>
        <h2>Welcome to <span>Task Mangaer App</span></h2>
        <p></p>

        <div className="btn_main">
          <a href="/login">Login Now</a>
        </div>

        <ul>
          <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
        </ul>
      </div>
    </section>
  );
};

export default WelcomePage;
