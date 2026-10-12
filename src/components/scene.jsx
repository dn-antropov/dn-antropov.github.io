import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scroller, Element } from 'react-scroll';

import Game from '../game/game';
import About from './about';
import ProjectSection from './projects/project_section';
import Contact from './contact';

const Scene = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (location.state?.scrollTo && navigationType !== 'POP') {
      // Delay the scroll slightly to ensure DOM is ready
      setTimeout(() => {
        scroller.scrollTo(location.state.scrollTo, {
          smooth: true,
          duration: 333,
          offset: -50, // adjust for fixed header
        });
      }, 100); // tweak if needed
    }
  }, [location]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Element name='game'>
        <Game />
      </Element>
      <Element name='about'>
        <About />
      </Element>
      <hr className='section-divider' />
      <Element name='commissioned'>
        <ProjectSection category='commissioned' />
      </Element>
      <hr className='section-divider' />
      <Element name='personal'>
        <ProjectSection category='personal' />
      </Element>
      <hr className='section-divider' />
      <Element name='contact'>
        <Contact />
      </Element>
    </div>
  );
};

export default Scene;
