import React from 'react';
import ReactPlayer from 'react-player';

import './VideoCard.scss';

interface IProps {
  video: string;
  width: string;
  classes?: string;
}

const VideoCard: React.FunctionComponent<IProps> = ({ video, width, classes }) => (
  <div className={`service__video service__section ${classes}`}>
    <ReactPlayer
      url={video}
      width={width}
      style={{ borderRadius: '20px', overflow: 'hidden' }}
      light={true}
    />
  </div>
);

export default VideoCard;
