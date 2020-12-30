import { getBaseUrl } from './ApiService';
import { ApiService } from './ApiService';

export async function getAccountDetails() {
  return ApiService.get(`${getBaseUrl()}/account_details`, {
    withCredentials: true, // for auto cookie forwarding
  });
}
