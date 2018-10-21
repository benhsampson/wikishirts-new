import React from 'react';

import ArrowThinLeft from '../../../assets/icons/arrow-thin-left';

const icons = ({ icon, fill }) => ({
  'arrow-thin-left': <ArrowThinLeft fill={fill} />,
})[icon];

const Icon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="20"
    height="20"
  >{icons(props)}</svg>
);

export default Icon;
