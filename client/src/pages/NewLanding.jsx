
import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/landing.jpg';
import main_alternative from '../assets/images/land.png';
import logo from '../assets/images/track_1.svg';
import second from '../assets/images/man.png';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
import { motion, useScroll, useTransform } from 'framer-motion';


const NewLanding = () => {

  return (
    <Wrapper>
      <nav>
      <img src={logo} alt='job hunt'  className='' width={80} height={1000}/>
      </nav>
      <motion.div
           initial={{opacity:0, y:50}}
           whileInView={{opacity:1,y:0, transition:{delay: 0.2, duration:0.3 }}}
           viewport={{once:false, amount:0.5}}
      className='container page'>
        <div className='info'>
          <h1>
           Track your 
           <span> Jobs</span>
          </h1>
          
          <p>Our job tracking application simplifies your job search by keeping all your applications in one place. Update your status, set reminders, and receive notifications. Stay organized and never miss an opportunity with real-time updates, ensuring you stay ahead in your job hunt. Try it today for seamless tracking!</p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn '>
            Login / Demo User
          </Link>
        </div>
        <img src={main_alternative} alt='job hunt' className='img main-img' />
       
      </motion.div>

    </Wrapper>
  );
};

export default NewLanding;