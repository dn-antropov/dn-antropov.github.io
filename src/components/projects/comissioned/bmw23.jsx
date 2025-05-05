import React from 'react';
import '../project.css';

const BMW23 = () => {
  return (
    <div className="project">
      <h1>The Car as Joystick</h1>
      <div className="project-meta">
        <div className="column-left">
          <p>
            At CES, more than 16,000 visitors stepped into an interactive driving experience.
            Thanks to a close collaboration between Journee, Usaneers, THE GAME, and NSYNK, attendees were
            invited to explore both reality and the Metaverse from behind the wheel of DEE.
          </p>
          <p>
            NSYNK developed a custom driving simulator that seamlessly connected DEE to the car's actual
            electronics, allowing it to function as a bridge between physical and virtual environments.
            Through the use of the Mixed Reality Slider, participants could decide whether to cruise through
            the real streets of Las Vegas or dive into an abstract, digitally enhanced version of the city.
          </p>
        </div>
        <div className="column-right">
          <div className="meta-row">
            <div className="meta-label">Client</div>
            <div className="meta-value">BMW</div>
          </div>
          <div className="meta-row">
            <div className="meta-label">Contractor</div>
            <div className="meta-value">NSYNK</div>
          </div>
          <div className="meta-row">
            <div className="meta-label">Year</div>
            <div className="meta-value">2023</div>
          </div>
          <div className="meta-row">
            <div className="meta-label">Role</div>
            <div className="meta-value">
              Development of a driving simulation within Unreal Engine,
              integrating real-time physical vehicle data into the simulation,
              and implementing the rendering of the driving experience on the vehicle's internal displays,
              on-site support
            </div>
          </div>
        </div>
      </div>
      <div className='media-grid'>
        <video
              src="/projects/comissioned/bmw23/webm/bmw-i-vision-dee_2-vp9.webm"
              autoPlay
              muted
              loop
              playsInline
        />
        <video
              className="vertical-video"
              src="/projects/comissioned/bmw23/webm/img_0168_1-vp9.webm"
              autoPlay
              muted
              loop
              playsInline
        />
        <video
              src="/projects/comissioned/bmw23/webm/playoutsection-vp9.webm"
              autoPlay
              muted
              loop
              playsInline
        />
      </div>
    </div>
  );
};

export default BMW23;
