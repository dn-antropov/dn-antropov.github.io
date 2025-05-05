import React from 'react';
import '../project.css';

const GaussianDreams = () => {
  return (
    <div className="project">
      <h1>Generate Gaussian Splats from AI Hallucinations</h1>
      <div className="project-meta">
        <div className="column-left">
        <p>
          I combined Stable Diffusion and DreamScene360 to create immersive, 360-degree panoramas.
          First, I used Stable Diffusion to generate an equirectangular panorama of a fictional world.
          Then, I processed the panorama through DreamScene360, which converts it into a Gaussian splat.
          The result is a surreal, immersive scene full of creative potential.
        </p>
        <p>
          Resulted pointclouds are imported into Unreal Engine. While DreamScene360's
          single-camera approach does limit some of the detail, the possibilities for creative exploration are endless.
        </p>
        </div>
        <div className="column-right">
          <div className="meta-row">
            <div className="meta-label">Year</div>
            <div className="meta-value">2024</div>
          </div>
        </div>
      </div>

      <video
            src="/projects/private/gaussiandreams/webm/gaussiandreams.webm"
            autoPlay
            muted
            loop
            playsInline
            className='vid-full-width'
      />
      </div>
  );
};

export default GaussianDreams;
