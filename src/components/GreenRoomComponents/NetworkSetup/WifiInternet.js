import React from 'react';
import { InternetIssues } from './InternetIssues';
import { NetworkTxt } from '../../../assets/LolaText';
import SvgWifiIcon from '../../../assets/images/SvgModified/SvgWifiIcon';

export default function WifiInternet() {
  return (
    <InternetIssues
      title={NetworkTxt.usingWifiTitle}
      subtitle={NetworkTxt.usingWifiSubtitle}
      notification={NetworkTxt.usingWifiNotification}
      is_wifi={true}
    >
      <SvgWifiIcon />
    </InternetIssues>
  );
}
