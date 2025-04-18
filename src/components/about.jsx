import React from 'react';
import VideoPlayer from './video_player';
import { Parallax } from 'react-scroll-parallax';

const About = () => {
    return (
    <>
      {/* <Parallax  translateY={[0, 40]}> */}
        <h1>About</h1>
        <div class = "container">
          <p class="text">
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
            creative developers I came to whatever I do these days.
          </p>
          <VideoPlayer src="./webm/persona.webm" autoPlay loop muted offset ={"62%"} class="video" />
        </div>
        {/* <p style = {{marginLeft: "32%"}}>
          I search for ways of implementing new technologies in creative and unexpected manner.
          Being it artifitial intelligence, that is not only a usual slop you see on the internet,
          game engines that are not only used for games,
          graphical shaders that are not only for shadowing, sensors and robots, that are not only used
          for industry.
          In my everyday work I help creating interactively driven communicaton between a person
          and a technology that conveys meaning. I admire the beauty of natural systems and try to
          transfer them to generative design, computer simulations and algorithmically driven
          visuals.
        </p>
        <div>
          <VideoPlayer src="./webm/fluidsim.webm" autoPlay loop muted offset ={"37%"} />
        </div> */}

      {/* </Parallax> */}


    </>
    );
  };

  export default About;