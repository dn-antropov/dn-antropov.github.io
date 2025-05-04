import React from 'react';
import '../project.css';

const BMW23 = () => {
  return (
    <div className="project">
      <h1>The Car as Joystick</h1>
      <div className="project-meta">
        <div className="column-left">
          <p>
            At CES, more than 16,000 visitors stepped into an interactive driving experience unlike any other.
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
              Camera tracking software, software development support, implementation of content, setup on site
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMW23;
