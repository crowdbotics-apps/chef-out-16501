import * as actions from "./constants";

const initialState = {
    countries: [],
    selectedCountry:null
};

export default CountryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.COUNTRY_UPDATE:
            return {
                ...state,
                countries: action.countries
            };

        case actions.SELECT_COUNTRY:
            return {
                ...state,
                selectedCountry: action.selectedCountry
            };
        default:
            return state;
    }
};