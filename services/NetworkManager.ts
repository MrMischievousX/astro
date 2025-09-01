import { fallbackHoroscopes } from '@/data/fallbackHoroscopes';
import { getCurrentLanguage } from '@/utils/i18n';

const BASE_URL = "https://horoscope-app-api.vercel.app/api/v1";

// Main function - uses hardcoded values by default
export const getTodayHoroscope = async (zodiac: string) => {
  // Get current language
  const currentLanguage = getCurrentLanguage() || 'en';
  const languageKey = currentLanguage === 'hi' ? 'hi' : 'en';
  
  // Get horoscope from hardcoded fallback data
  const horoscopeText = fallbackHoroscopes[languageKey][zodiac.toLowerCase() as keyof typeof fallbackHoroscopes.en];
  
  // Return in the same format as the API would
  return {
    data: {
      horoscope_data: horoscopeText || fallbackHoroscopes[languageKey].aries
    },
    status: 200,
    success: true
  };
};

// Separate API function (if needed in the future)
export const getTodayHoroscopeFromAPI = async (zodiac: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(BASE_URL + `/get-horoscope/daily?sign=${zodiac}&day=TODAY`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
