/**
 * No_Gas_Labs™ Tab Injection Mechanism
 * 
 * This module bridges the Command Center web dashboard with the browser extension.
 * It uses the 'relay-token' protocol to pass instructions to the extension's 
 * background script which then injects prompts into AI platform tabs.
 */

export interface InjectionRequest {
  platforms: string[];
  prompt: string;
  relayToken: string;
}

export interface InjectionResponse {
  platform: string;
  status: 'SUCCESS' | 'ERROR' | 'PENDING';
  data?: string;
  error?: string;
}

/**
 * Dispatches a prompt to the extension for injection into specific tabs.
 * In a real environment, this uses window.postMessage or a custom event 
 * that the extension's content script listens for.
 */
export async function injectToTabs(request: InjectionRequest): Promise<InjectionResponse[]> {
  console.log(`[TAB_INJECTION] Initiating relay with token: ${request.relayToken}`);
  
  // Create a custom event that the No_Gas_Labs extension listens for
  const event = new CustomEvent('NGL_COMMAND_CENTER_RELAY', {
    detail: request
  });
  
  window.dispatchEvent(event);
  
  // Return simulated responses for the UI
  return request.platforms.map(p => ({
    platform: p,
    status: 'PENDING',
    data: `Relay initiated for ${p}`
  }));
}

/**
 * Listens for responses from the extension.
 */
export function listenForExtensionResponses(callback: (response: InjectionResponse) => void) {
  window.addEventListener('NGL_EXTENSION_RESPONSE', (event: any) => {
    if (event.detail) {
      callback(event.detail);
    }
  });
}
