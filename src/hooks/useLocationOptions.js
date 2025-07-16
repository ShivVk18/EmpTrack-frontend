import { useFormFlowStore } from "@/store/useFormFlowStore"
import { removeAccents } from "@/lib/normalUtils"
import axios from "axios"

export const useLocationOptions = () => {
  const {
    setCountries,
    setStates,
    setCities,
    setSelectedState,
    setSelectedCity,
  } = useFormFlowStore();

  const getCountries = async () => {
    try {
      const res = await axios.get('https://countriesnow.space/api/v0.1/countries/positions');
      const cleaned = res.data.data.map((c) => ({
        ...c,
        name: removeAccents(c.name),
      }));
      setCountries(cleaned);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const getStates = async (country) => {
    try {
      const res = await axios.post('https://countriesnow.space/api/v0.1/countries/states', { country });
      const cleaned = res.data.data.states.map((s, i) => ({
        ...s,
        name: removeAccents(s.name),
        id: `state-${i}-${removeAccents(s.name)}`,
      }));
      setStates(cleaned);
      setSelectedState('');
      setSelectedCity('');
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const getCities = async (country, state) => {
    try {
      const res = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', { country, state });
      const cleaned = (res.data.data || []).map((city, i) => ({
        name: removeAccents(city),
        id: `city-${i}-${removeAccents(city).toLowerCase().replace(/\s+/g, '-')}`,
      }));
      setCities(cleaned);
      setSelectedCity('');
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  return {
    getCountries,
    getStates,
    getCities,
  };
};
