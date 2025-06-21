import { useState, useEffect } from "react";
import { Country, State, City,  } from "country-state-city";
import { ICountry, IState, ICity, Status, SelectedLocation } from "../../constant/country.state.city";

export const useLocationSelection = () => {
  type DataType = {
    countries: ICountry[];
    states: IState[];
    cities: ICity[];
  };

  const [location, setLocation] = useState<DataType>({
    countries: [],
    states: [],
    cities: [],
  });

  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
    country: null,
    state: null,
    city: null,
  });
  const [status, setStatus] = useState<Status>({
    loadingCountries: false,
    loadingStates: false,
    loadingCities: false,
    error: null,
  });

  const updateStatus = (updates: Partial<Status> )=>{
    setStatus((prev)=>{
        return{...prev, ...updates}
    })
  }
  

  useEffect(() => {
    const fetchCountries = async () => {
       updateStatus({loadingCountries: true, error: null})
       if(!status.loadingStates || !status.loadingCities){
        updateStatus({loadingStates: true, loadingCities: true})
       }
        try {
          const allCountries: ICountry[] = Country.getAllCountries();
          setLocation(prev => ({ ...prev, countries: allCountries }));
        } catch (err) {
            updateStatus({loadingCountries: false})
          console.error('Error fetching countries:', err);
          updateStatus({ error: 'Failed to load countries. Please try again.' });
        } finally {
          updateStatus({ loadingCountries: false, loadingStates: false, loadingCities: false });
         
        }
      };
  
      fetchCountries();
  }, []);

  useEffect(()=>{
    const fetchStates = async () => {
        const countryIsoCode = selectedLocation.country?.isoCode;
        updateStatus({loadingStates: true})
        setLocation((prev) => ({ ...prev, states: [], cities: [] }));
        // setSelectedLocation((prev) => ({ ...prev, state: null, city: null }));

        if (!countryIsoCode) {
          return;
        }
  
        updateStatus({ loadingStates: true, error: null });
        try {
          const countryStates = State.getStatesOfCountry(countryIsoCode) as  IState[];
          setLocation(prev => ({ ...prev, states: countryStates, cities: [] }));
        } catch (err) {
          console.error(`Error fetching states for ${selectedLocation.country?.name}:`, err);
          updateStatus({ error: 'Failed to load states for the selected country.' });
        } finally {
          updateStatus({ loadingStates: false });
        }
      };
  
      fetchStates();

  }, [location.countries, selectedLocation.country])

  useEffect(() => {
    const fetchCities = async () => {
      const countryIsoCode = selectedLocation.country?.isoCode;
      const stateIsoCode = selectedLocation.state?.isoCode;

      if (!countryIsoCode || !stateIsoCode) {
        // setLocation(prev => ({ ...prev, cities: [] }));
        // setSelectedLocation(prev => ({ ...prev, city: null }));
        return;
      }

      updateStatus({ loadingCities: true, error: null });
      try {
        const countryCities = City.getCitiesOfState(countryIsoCode, stateIsoCode) as  ICity[]
        setLocation(prev => ({ ...prev, cities: countryCities }));
        setSelectedLocation(prev => ({ ...prev, city: null }));
      } catch (err) {
        console.error(`Error fetching cities for ${selectedLocation.state?.name} in ${selectedLocation.country?.name}:`, err);
        updateStatus({ error: 'Failed to load cities for the selected state.' });
      } finally {
        updateStatus({ loadingCities: false });
      }
    };

    fetchCities();
  }, [selectedLocation.state, selectedLocation.country]);

  return {
    location,
    selectedLocation,
    setSelectedLocation,
    status, // Return the consolidated status object
  };

};
