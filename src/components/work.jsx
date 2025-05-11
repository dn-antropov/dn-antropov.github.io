import React from 'react';

import { Link } from 'react-router-dom';

const Work = () => {
    return (
    <>
      <h1>Work</h1>
      <p>
        In both my personal and commissioned projects, I often focus on building complex, integrated systems.
        These may involve computer vision, artificial intelligence, custom-made sensors, or data-driven visualizations.
      </p>
      <p>
        Depending on the creative goal, I choose the tools that best suit the project. Given the complexity of the projects
        I work on, I primarily code in C++, C#, and Python. I use real-time engines
        like Unreal Engine when I need visual fidelity, or Unity when multiplatform deployment is important
        — especially for mobile app development.
      </p>
      <p>
        When I create interactive experiences for museum exhibitions and stage shows, I often turn to VVVV and TouchDesigner
        — tools I consider unbeatable for rapid prototyping and for integrating unconventional hardware.
      </p>
      <p>
        I'm fascinated by the mathematical beauty of shaders and always try to find time to tinker with GLSL or HLSL snippets.
        Example of such experimentations you see on top of this website. Another major interest of mine is artificial intelligence. While I'm not entirely sold on the surrounding hype,
        I'm genuinely curious about the creative potential it unlocks.
      </p>
      <p>
        Here is a short list of selected works that I believe represent what interests and moves me.
        It's a mix of commissioned and personal projects, shown in no particular order. The only
        criterion is that each piece reveals some facet of my work.
      </p>
      <div className="thumbnail">
        <Link to="/projects/bmw23">
          <h1 className="caption">Metaverse Drive for BMW i Vision Dee</h1>
          <video
            src="/projects/comissioned/bmw23/webm/bmw-i-vision-dee_2-vp9.webm"
            autoPlay
            muted
            loop
            playsInline
            className="vid"
          />
        </Link>
      </div>
      <div className="thumbnail">
        <Link to="/projects/ish23">
          <h1>Image Processing Pipeline for Viessmann at ISH23</h1>
          <video
            src="/projects/comissioned/ish23/webm/230330_vi_ish23_cut_03-vp9.webm"
            autoPlay
            muted
            loop
            playsInline
            className="vid"
          />
        </Link>
      </div>
      <div className="thumbnail">
        <Link to="/projects/gaussiandreams">
          <h1>AI Hallucinations as Gaussian Splats</h1>
          <video
            // src="/projects/private/gaussiandreams/webm/gaussiandreams.webm"
            autoPlay
            muted
            loop
            playsInline
            className="vid"
          >
            <source src="/projects/private/gaussiandreams/webm/gaussiandreams.webm" type="video/webm" />
            <source src="/projects/private/gaussiandreams/webm/gaussiandreams.mp4" type="video/mp4" />
            Your browser does not support the video.
          </video>
        </Link>
      </div>
      <div className="thumbnail headline">
        <h1>Recursive Neural Networks for Sounds Creation</h1>
      </div>
      <div className="iframe-container">
        <iframe
          className="bandcamp-iframe"
          src="https://bandcamp.com/EmbeddedPlayer/album=2455724268/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/track=558240815/transparent=true/"
          seamless>
          <a href="https://godacollective.bandcamp.com/album/nohomo">NOHOMO by GODA</a>
        </iframe>
      </div>
    </>
    );
  };

  export default Work;