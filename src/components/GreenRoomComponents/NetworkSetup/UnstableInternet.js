import React from 'react';
import { InternetIssues } from './InternetIssues';
import { NetworkTxt } from '../../../assets/LolaText';
import SvgEthernetIcon from '../../../assets/images/SvgModified/SvgEthernetIcon';

export default function UnstableInternet() {
  return (
    <InternetIssues
      title={NetworkTxt.unstableInternetTitle}
      subtitle={NetworkTxt.unstableInternetSubtitle}
      notification={NetworkTxt.unstableInternetNotification}
      is_wifi={false}
    >
      <SvgEthernetIcon />
    </InternetIssues>
  );
}
