import React, { useEffect, useRef } from "react";
import { usePersonalInfoForm } from "../hooks/UserPersonalInfoForm";
import { ICity, ICountry } from "../../constant/country.state.city";
const PersonalInformation: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();

  }, []);
  const {
    handleSubmit,
    handleChange,
    err,
    handleBack,
    handleNext,
    status,
    location,
    selectedLocation,
    personalInfor,
  } = usePersonalInfoForm();
  return (
    <div className="w-full">
      <h2 className="text-lg text-customPurple font-bold opacity-80 text-center">
        Personal information
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="grid grid-cols-1 md:grid-cols-2 md:gap-4"
      >
        {/* First name */}
        <div className="w-full">
          <label className=" text-dark_gray opacity-80" htmlFor="mail">
            Surname: <span className="text-red-500 text-2xl">*</span>
            <br />
            <span className="text-xs text-red-500 font-semibold">
              {err.surnname}
            </span>
          </label>
          <input
            className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
            type="text"
            ref={inputRef}
            onChange={(e) => handleChange(e)}
            name="surnname"
            value={personalInfor.surnname}
            placeholder="Enter surname"
            required
          />
        </div>

        {/* Fisrt name */}
        <div className="w-full">
          <label className="text-dark_gray opacity-80" htmlFor="mail">
            First name: <span className="text-red-500 text-2xl">*</span>
            <br />
            <span className="text-xs text-red-500 font-semibold">
              {err.firstname}
            </span>
          </label>
          <input
            className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
            type="text"
            name="firstname"
            value={personalInfor.firstname}
            onChange={(e) => handleChange(e)}
            placeholder="Enter first name"
            required
          />
        </div>

        {/* Phone number */}
        <div className="w-full">
          <label className="text-dark_gray opacity-80" htmlFor="mail">
            Phone number: <span className="text-red-500 text-2xl">*</span>
            <br />
            <span className="text-xs text-red-500 font-semibold">
              {err.number}
            </span>
          </label>
          <input
            className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
            type="number"
            value={personalInfor.number}
            onChange={(e) => handleChange(e)}
            name="number"
            placeholder="+234"
            required
          />
        </div>

        {/* Country */}

        <div className="w-full">
          <label className="text-dark_gray opacity-80" htmlFor="mail">
            Country <span className="text-red-500 text-2xl">*</span>
            <br />
            <span className="text-xs text-red-500 font-semibold">
              {err.country}
            </span>
          </label>
          <select
            name="country"
            onChange={(e) => handleChange(e)}
            value={personalInfor.country}
            className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
          >
            <option value="">select country</option>
            {status.loadingCountries ? (
              <option value="">loading...</option>
            ) : (
              location.countries.map((item: ICountry) => (
                <option
                  key={item.isoCode}
                  value={item.isoCode}
                  className="text-dark_purple font-semibold"
                >
                  {item.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="text-dark_gray opacity-80" htmlFor="state">
            State <span className="text-red-500 text-2xl">*</span>
            <br />
            <span className="text-xs text-red-500 font-semibold">
              {err.state}
            </span>
          </label>
          <select
            name="state"
            className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:border-gray-400 focus:outline-none px-4 py-3"
            onChange={(e) => handleChange(e)}
          >
            {status.loadingStates && <option>Loading ...</option>}
            {!status.loadingStates && location.states.length === 0 && (
              <>
                <option value="">select state</option>
                <option value={selectedLocation.country?.name}>
                  {selectedLocation.country?.name}
                </option>
              </>
            )}
            {!status.loadingStates &&
              location.states.length !== 0 &&
              location.states.map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {/* City */}

        <div className="w-full">
          <label className="text-dark_gray opacity-80" htmlFor="mail">
            City <span className="text-red-500 text-2xl">*</span>
            <br />
            <span className="text-xs text-red-500 font-semibold">
              {err.city}
            </span>
          </label>
          <select
            name="city"
            className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
            onChange={(e) => handleChange(e)}
          >
            {status.loadingCities && <option>Loading...</option>}
            {!status.loadingCities &&
              location.cities.length !== 0 &&
              location.cities.map((item: ICity) => (
                <option key={item.name}>{item.name}</option>
              ))}
            {!status.loadingCities && location.cities.length === 0 && (
              <>
              <option value="">Select city</option>
               <option value={personalInfor.state}>{personalInfor.state}</option>
              </>
            )}
          </select>
        </div>

        {/* Left form field */}

        {/*Right form field */}

        <div className="w-full">
          <label className="text-dark_gray opacity-80" htmlFor="dateOfBirth">
            Date of birth: <span className="text-red-500 text-2xl">*</span>
            <br />
            <span className="text-xs text-red-500 font-semibold">
              {err.dateOfBirth}
            </span>
          </label>
          <input
            className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
            type="date"
            value={personalInfor.dateOfBirth}
            onChange={(e) => handleChange(e)}
            name="dateOfBirth"
            placeholder="Enter first name"
            required
          />
        </div>

        {/* Gender*/}
        <div className="w-full">
          <label className="text-dark_gray opacity-80" htmlFor="gender">
            Gender <span className="text-red-500 text-2xl">*</span>
            <br />
            <span className="text-xs text-red-500 font-semibold">
              {err.gender}
            </span>
          </label>
          <select
            name="gender"
            onChange={(e) => handleChange(e)}
            className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
          >
            <option className="text-dark_purple font-semibold" value="">
              --Select gender
            </option>
            <option className="text-dark_purple font-semibold" value="male">
              Male
            </option>
            <option className="text-dark_purple font-semibold" value="female">
              Female
            </option>
          </select>
        </div>

        {/* Address */}
        <div className="w-full">
          <label className="text-dark_gray opacity-80" htmlFor="address">
            Address <span className="text-red-500 text-2xl">*</span>
            <br />
            <span className="text-xs text-red-500 font-semibold">
              {err.address}
            </span>
          </label>
          <input
            className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
            type="text"
            onChange={(e) => handleChange(e)}
            name="address"

            value={personalInfor.address}
            placeholder="Ikeja, Lagos State, Nigeria"
            required
          />
        </div>

        {/* LGA */}
        {/* LGA */}
        {/* <div className="w-full">
            <label
              className="text-dark_gray opacity-80"
              htmlFor="localGovernment"
            >
              LGA <span className="text-red-500 text-2xl"></span>
              <br />
              <span className="text-xs text-red-500 font-semibold">
                {err.localGoverment}
              </span>
            </label>
            <select
              name="localGoverment"
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
              onChange={(e) => handleChange(e)}
            >
              {status.loadingCountries ? (
                <option>Loading...</option>
              ) : (
                location.countries.map((item) => (
                  <option
                    key={item.isoCode}
                    value={item.isoCode}
                    className="text-dark_purple font-semibold"
                  >
                    {item.name}
                  </option>
                ))
              )}
            </select>
          </div> */}

        {/*Right form field */}
      </form>
      <div className="flex justify-between items-center my-10 md:mt-20">
        <button
          onClick={handleBack}
          className="bg-white_gray px-6 py-2 text-dark_purple rounded-3xl border-2 font-bold border-transparent hover:border-customPurple"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-dark_purple py-2 px-8 rounded-3xl text-white font-bold border-2 border-transparent hover:bg-white_gray hover:text-dark_purple hover:border-dark_purple"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default PersonalInformation;
