/**
 * constants
 *
 * @author John Clark
*/
export const API_URL = "https://web.b3.network/kiko/api";
export const WS_CHAT_URL = (token: string) => `wss://web.b3.network/kiko/api/v1/k/chat?token=${token}`;
export const LOGIN_URL = "https://web.b3.network/kiko/api/v1/login";
export const SIGNUP_URL = "https://web.b3.network/kiko/api/v1/signup";
