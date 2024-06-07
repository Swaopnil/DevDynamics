import React from 'react';

type Props = {
  icon: string;
  title: string;
  info: string | JSX.Element;
  description: string;
};

const Tile: React.FC<Props> = ({ icon, title, info, description }) => {
  return (
    <div className="tile">
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div className="info">{info}</div>
      <div className="description">{description}</div>
    </div>
  );
};

export default Tile;
