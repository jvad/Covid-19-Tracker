export const getCountryData = async (selectedCountry) => {
  let changeableUrl = "https://covid19.mathdro.id/api/countries";
  if (selectedCountry) {
    changeableUrl = `https://covid19.mathdro.id/api/countries/${selectedCountry}`;
  }
  const response = await fetch(changeableUrl);
  let data = await response.json();
  return data;
};
