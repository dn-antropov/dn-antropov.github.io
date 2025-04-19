import React from 'react';
// import VideoPlayer from './video_player';

const About = () => {
    return (
    <>
      <h1>About</h1>
      <div >
        <p class="text">
          I'm a creative developer and media artist with an unusual background.
          I didn't receive professional training in either of the fields I'm currently working in.
          After completing my PhD in Art History, I parted ways with art theory in favor of creating my own art.
          Since I couldn't draw or paint, I turned to the only tool available to me at the time — my personal computer.
        </p>
        <p class="text">
          You might ask yourself why an art historian would be capable of programming and engineering, alongside
          doing artsy stuff — which, in the case of art history, is more understandable.
          I firmly believe that computer science is, in part, a form of literature.
          As a former art historian, I was trained to tell stories, explain theories, and connect them to their
          material basis — the art itself.
          Through that, along with self-education and the support of a community of media artists and creative
          developers, I arrived at whatever it is I do today.
        </p>
        <p class="text">
          I find inspiration in the constantly evolving world of technology, always exploring new ways to communicate
          ideas and narratives — both my own and those of the people I work with or work for.
          It's no surprise that surviving solely on media art is no joke, but I still try to do my small artsy bits.
          They help me stay sharp and feed back into the commercial commissions that keep me going.
        </p>
        {/* <VideoPlayer src="./webm/persona.webm" autoPlay loop muted offset ={"62%"} class="video" /> */}
      </div>
    </>
    );
  };

  export default About;