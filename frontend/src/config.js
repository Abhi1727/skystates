// API base: /api in production (nginx proxies to backend), same for dev with proxy
export const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Pay Now – Partner EMI links (set in .env to redirect to your payment sites)
export const PAY_NOW_LINKS = [
  { label: "Partner EMI's 1", url: process.env.REACT_APP_PAY_NOW_EMI_1_URL || '#' },
  { label: "Partner EMI's 2", url: process.env.REACT_APP_PAY_NOW_EMI_2_URL || '#' },
  { label: "Partner EMI's 3", url: process.env.REACT_APP_PAY_NOW_EMI_3_URL || '#' },
  { label: "Partner EMI's 4", url: process.env.REACT_APP_PAY_NOW_EMI_4_URL || '#' },
];
