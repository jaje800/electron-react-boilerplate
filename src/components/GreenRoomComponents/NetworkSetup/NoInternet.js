import React from 'react';
import { InternetIssues } from './InternetIssues';
import { NetworkTxt } from '../../../assets/LolaText';
import SvgEthernetIcon from '../../../assets/images/SvgModified/SvgEthernetIcon';
import SvgWifiIcon from '../../../assets/images/SvgModified/SvgWifiIcon';

export default function NoInternet() {
  return (
    <InternetIssues
      title={NetworkTxt.noInternetTitle}
      subtitle={NetworkTxt.noInternetSubtitle}
      notification={NetworkTxt.noInternetNotification}
      is_wifi={false}
    >
      <SvgWifiIcon />
      <SvgEthernetIcon />
    </InternetIssues>
  );
}
