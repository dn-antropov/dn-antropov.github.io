import React from 'react';
import '../project.css';

const ISH23 = () => {
  return (
    <div className="project">
      <h1>Real-Time Image Processing Pipeline</h1>
      <div className="project-meta">
        <div className="column-left">
					<p>
						Together with Markgraph and their client Viessmann, NSYNK crafted an immersive visitor
						engagement concept that seamlessly took over the entire Viessmann booth at ISH 2023.
					</p>
					<p>
						A key element of the experience was a network of six photo stations, where professional
						photographers captured portraits of attendees throughout the day. Guests could then explore
						their photos, apply visual filters, and fine-tune the look to their preference.
					</p>
					<p>
						Once approved, the processed images were instantly transmitted to a range of digital displays
						across the booth—including compact satellite screens positioned around the space, a centrally
						embedded 6x4-meter LED floor display, and a commanding 42-meter-wide LED screen mounted at the
						top of the booth structure—creating a dynamic and personalized visual presence for every participant.
					</p>
				</div>
        <div className="column-right">
          <div className="meta-row">
            <div className="meta-label">Client</div>
            <div className="meta-value">Viessmann</div>
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

export default ISH23;
