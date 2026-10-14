import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scroller, Element } from 'react-scroll';

import Game from '../game/game';
import TextSection from './text_section';
import ProjectSection from './projects/project_section';

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
        <TextSection name='about' />
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
        <TextSection name='contact' />
      </Element>
    </div>
  );
};

export default Scene;
