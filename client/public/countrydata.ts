export interface CountryData {
    code: string;
    dialCode: string;
    name: string;
    flag: string;
  }
  
export const countries: CountryData[] = [
    { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
    { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳" },
    { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷" },
    { code: "JP", dialCode: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "BR", dialCode: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "RU", dialCode: "+7", name: "Russia", flag: "🇷🇺" },
    { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "CN", dialCode: "+86", name: "China", flag: "🇨🇳" },
    { code: "ET", dialCode: "+251", name: "Ethiopia", flag: "🇪🇹" },
  ];