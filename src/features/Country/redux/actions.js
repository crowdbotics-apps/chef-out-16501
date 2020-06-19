import * as actions from "./constants";

export const loadCountry = () => ({
  type: actions.COUNTRY_REQUEST
});

export const setCountry = (selectedCountry) => ({
  type: actions.SELECT_COUNTRY,
  selectedCountry
});
