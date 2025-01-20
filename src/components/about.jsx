import React from 'react';
import VideoPlayer from './video_player';
import { Parallax } from 'react-scroll-parallax';

const About = () => {
    return (
    <>
      <Parallax  translateY={[0, 40]}>
        <h1>About</h1>
        <p>
          I'm a creative developer with not so usual background.
          After finishing my PhD in Art History I part ways with art theory
          in favor of practicing my own interective art. Because I couldn't
          really draw or paint I decided to seek a help of the most available
          tool for me - a computer.
          Maybe you wonder why would art historian be capable of doing computer stuff.
          I solely believe that computer science is partly literature and I as
          a former art historian was trained to tell stories,
          explaining theories and connect them to material basis - the art itself.
          Through this as well as self educating and community of media artists and
          creative developers come to whatever I do these days.
        </p>
        <p>
          I search for ways of implementing new technologies in creative and unexpected manner.
          Being it artifitial intelligence that not a slop, game engines that not only for games,
          graphical shaders that are not only for shadowing, sensors and robots one stage.
          In my everyday work I help creating interactive driven communicaton between a person
          and a technology that conveys meaning. I admire the beauty of natural systems and try to
          transfer it to generative design, computer simulations and algorithmically driven
          visuals.
        </p>
      </Parallax>
      <div>
        <VideoPlayer src="./webm/fluidsim.webm" autoPlay loop muted />
      </div>

    </>
    );
  };

  export default About;