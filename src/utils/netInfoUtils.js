import { useEffect, useState } from 'react';

//const GOOD_JITTER_CUTOFF = 200000; //to test good network conditions
const GOOD_JITTER_CUTOFF = 8000;

/********************************************************************* 
-1 = offline
 0 = no connection - could be searching still
 1 = wifi
 2 = ethernet, jitter over good value cutoff
 3 = ethernet, made the cutoff
*********************************************************************/
export function getNetworkRank(conditions, isOffline) {
  if (isOffline) return -1;
  if (!conditions) {
    return 0;
  }
  if (conditions.is_wifi_or_worse) {
    return 1;
  } else if (conditions.jitterMicroseconds > GOOD_JITTER_CUTOFF) {
    return 2;
  } else {
    return 3;
  }
}

/********************************************************************* 
returns checkbox usable results based on network rank 
-1 = no connection
 0 = not yet determined, could be searching 
 1 = wifi      
 2 = ethernet high jitter
 3 = ethernet low jitter
*********************************************************************/

export function getNetworkStatus(rank) {
  let results = {
    result: 'todo',
    flagged: 'false',
  };
  switch (rank) {
    case -1:
      results.result = 'fail';
      break;
    case 0:
      results.result = 'todo';
      break;
    case 1:
    case 2:
      results.result = 'pass';
      results.flagged = 'true';
      break;
    case 3:
      results.result = 'pass';
      break;
    default:
      console.log('default');
      break;
  }
  return results;
}

export function useOnlineStatus() {
  const [isOffline, setIsOffline] = useState(null);

  useEffect(() => {
    window.addEventListener('offline', function (e) {
      setIsOffline(true);
    });
    window.addEventListener('online', function (e) {
      setIsOffline(false);
    });

    return () => {
      window.removeEventListener('offline', function (e) {
        console.log('removed offline listener');
      });
      window.removeEventListener('online', function (e) {
        console.log('removed online listener');
      });
    };
  }, []);
  return isOffline;
}

export function getRegionName(region) {
  switch (region) {
    case 'us-east-1':
      return 'N. Virginia';
    case 'us-east-2':
      return 'Ohio';
    case 'us-west-1':
      return 'N. California';
    case 'us-west-2':
      return 'Oregon';
    case 'af-south-1':
      return 'Cape Town';
    case 'ap-east-1':
      return 'Hong Kong';
    case 'ap-south-1':
      return 'Mumbai';
    case 'ap-northeast-1':
      return 'Tokyo';
    case 'ap-northeast-2':
      return 'Seoul';
    case 'ap-northeast-3':
      return 'Osaka';
    case 'ap-southeast-1':
      return 'Singapore';
    case 'ap-southeast-2':
      return 'Sydney';
    case 'ca-central-1':
      return 'Canada Central';
    case 'cn-north-1':
      return 'Begijing';
    case 'cn-northwest-1':
      return 'Ningxia';
    case 'eu-central-1':
      return 'Frankfurt';
    case 'eu-west-1':
      return 'Ireland';
    case 'eu-west-2':
      return 'London';
    case 'eu-west-3':
      return 'Paris';
    case 'eu-south-1':
      return 'Milan';
    case 'eu-north-1':
      return 'Stockholm';
    case 'me-south-1':
      return 'Bahrain';
    case 'sa-east-1':
      return 'Sao Paulo';
    default:
      return 'unknown';
  }
}
