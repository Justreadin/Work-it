export interface ICountry {
    isoCode: string;
    name: string;
    phonecode: string;
    flag: string;
    currency: string;
    latitude: string;
    longitude: string;
  }
  
  export interface IState {
    isoCode: string; // The state's ISO code, e.g., "NY" for New York
    name: string;
    countryCode: string; // The country's ISO code, e.g., "US"
    latitude: string;
    longitude: string;
  }
  
  export interface ICity {
    name: string;
    stateCode: string; // The state's ISO code
    countryCode: string; // The country's ISO code
    latitude: string;
    longitude: string;
  }

   export interface Status {
    loadingCountries: boolean;
    loadingStates: boolean;
    loadingCities: boolean;
    error: string | null;
  }

  export interface SelectedLocation{
    country: ICountry | null;
    state: IState | null;
    city: ICity | null;
  }