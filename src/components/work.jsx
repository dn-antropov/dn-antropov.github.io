import React from 'react';

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
        Interestingly, I started my journey by creating interactive experiences with VVVV and TouchDesigner
        — tools I still consider unbeatable for rapid prototyping and for projects requiring unconventional hardware integration.
      </p>
      <p>
        I'm fascinated by the mathematical beauty of shaders and always try to find time to tinker with GLSL or HLSL snippets.
        Another major interest of mine is artificial intelligence. While I'm not entirely sold on the surrounding hype,
        I'm genuinely curious about the creative potential it unlocks.
      </p>
      <p>
        Here is a list of selected works that I believe represent what interests and moves me.
        It's a mix of commissioned and personal projects, shown in no particular order. The only
        criterion is that each piece reveals some facet of my work.
      </p>
      <div class="thumbnail">
        <a href="https://example.com" class="thumbnail" target="_blank">
          <img src="/projects/comissioned/ish23/jpg/ish23_01.jpg" alt="Image Processing Pipeline"></img>
          <p class="caption">Image Processing Pipeline for Viessmann at ISH23</p>
        </a>
      </div>
      <div class="thumbnail">
        <a href="https://example.com" class="thumbnail" target="_blank">
          <img src="/projects/comissioned/bmw23/jpg/bmw23_01.jpg" alt="Driving Simulator"></img>
          <p class="caption">Driving Simulator for BMW i Vision Dee</p>
        </a>
      </div>
    </>
    );
  };

  export default Work;