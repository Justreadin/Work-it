import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../contexts/FormContext";
import { PersonalInfoProp } from "../../constant/constant.type";


const storedEmail = localStorage.getItem("userEmail");
      console.log("📧 Stored Email:", storedEmail);
      
const PersonalInformation: React.FC = () => {
  const formState = useForm();
  const navigate = useNavigate();

  // States for personal information
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoProp>({
    firstname: "",
    surname: "",
    number: "",
    email: storedEmail ?? undefined,
    country: "",
    city: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    state: "",
    localGovernment: "",
  });

  // Error handling state
  const [errors, setErrors] = useState<Partial<PersonalInfoProp>>({});

  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    // List of all countries
    const countryList = [
      "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
      "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
      "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
      "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
      "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
      "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
      "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
      "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
      "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
      "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
      "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
      "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
      "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Panama",
      "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
      "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
      "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka",
      "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
      "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
      "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];
    setCountries(countryList);
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setPersonalInfo((prev) => ({ ...prev, country: selectedCountry }));

    // Fetch states for the selected country
    const stateMap: Record<string, string[]> = {
      "Nigeria": ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"],
      "United States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
      "Canada": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"],
      "Australia": ["Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"],
      "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", "Lakshadweep", "Delhi", "Puducherry"],
      "Brazil": ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins", "Distrito Federal"],
      "United Kingdom": ["England", "Northern Ireland", "Scotland", "Wales"],
      "Germany": ["Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"],
      "France": ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"],
      "Japan": ["Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu", "Gunma", "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Ibaraki", "Ishikawa", "Ishikawa", "Ibaraki", "Kyoto", "Kagawa", "Kochi", "Kagawa", "Kochi", "Nagano", "Nagasaki", "Nara", "Niigata", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yokohama"],
      "Mexico": ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico City", "Mexico State", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"],
      "Italy": ["Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli Venezia Giulia", "Lazio", "Liguria", "Lombardy", "Marche", "Molise", "Piedmont", "Apulia", "Sardinia", "Sicily", "Tuscany", "Trentino-Alto Adige", "Umbria", "Aosta Valley", "Veneto"],
      "South Africa": ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"],
      "Argentina": ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"],
      "China": ["Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guizhou", "Hainan", "Hebei", "Heilongjiang", "Henan", "Hong Kong", "Hubei", "Hunan", "Inner Mongolia", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Macau", "Ningxia", "Qinghai", "Shaanxi", "Shandong", "Shanghai", "Shanxi", "Sichuan", "Tianjin", "Tibet", "Xinjiang", "Yunnan", "Zhejiang"]
    };


    setStates(stateMap[selectedCountry] || []);
  };

  const handleNext = async () => {
    console.log("🔵 handleNext function is called!");

    console.log("🔵 Submitting Personal Information:", personalInfo);

    // Validation logic
    const emptyFields = Object.entries(personalInfo).filter(([_, value]) => value.trim() === "");
    if (emptyFields.length > 0) {
      console.warn("⚠️ Validation failed! Empty fields:", emptyFields);
      const newErrors: Partial<PersonalInfoProp> = {};
      emptyFields.forEach(([key]) => {
        newErrors[key as keyof PersonalInfoProp] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      });
      setErrors(newErrors);
      return;
    }

    console.log("✅ Validation passed! Proceeding to try block...");

    try {
      console.log("🟢 Entering try block...");
      const storedEmail = localStorage.getItem("userEmail");
      console.log("📧 Stored Email:", storedEmail);

      if (!storedEmail) {
        console.error("❌ Email not found. Stopping execution.");
        return;
      }

      const requestBody = {
        email: storedEmail,
        firstname: personalInfo.firstname,
        surname: personalInfo.surname,
        number: personalInfo.number,
        country: personalInfo.country,
        city: personalInfo.city,
        dateOfBirth: personalInfo.dateOfBirth,
        gender: personalInfo.gender,
        address: personalInfo.address,
        state: personalInfo.state,
        localGovernment: personalInfo.localGovernment,
      };

      console.log("📦 Request Body:", JSON.stringify(requestBody, null, 2));

      const response = await fetch("https://lyrical-p6de.onrender.com/api/personalinformation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("🔵 Awaiting response...");
      if (!response.ok) {
        throw new Error(`❌ API Error ${response.status}: Failed to save personal information`);
      }

      const data = await response.json();
      console.log("✅ Server Response:", data.message);

      formState?.setPersonalInfor(personalInfo);
      formState?.setFilled((prev) => ({ ...prev, personalInfor: true }));
      navigate("/sign-upprofile/education");
    } catch (error) {
      console.error("❌ API Request Failed:", error);
      alert("Failed to save personal information. Please check your network and try again.");
    }
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => {
      const updatedInfo = { ...prev, [name]: value };
      console.log("Updated Personal Info:", updatedInfo);
      return updatedInfo;
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  return (
    <div className="w-full md:w-[70%]">
      <h2 className="text-lg text-customPurple font-bold opacity-80 text-center">Personal Information</h2>
      <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 md:space-x-10">
        <div className="w-full">
          {/* Surname */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="surname">
              Surname: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.surname}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="text"
              name="surname"
              value={personalInfo.surname}
              onChange={handleChange}
              placeholder="Enter surname"
              required
            />
          </div>

          {/* First Name */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="firstname">
              First name: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.firstname}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="text"
              name="firstname"
              value={personalInfo.firstname}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          {/* Country */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="country">
              Country: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.country}</span>
            </label>
            <select
              name="country"
              value={personalInfo.country}
              onChange={handleCountryChange}
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
            >
              <option className="text-dark_purple font-semibold" value="">--Select Country</option>
              {countries.map((country) => (
                <option key={country} className="text-dark_purple font-semibold" value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="state">
              State: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.state}</span>
            </label>
            <select
              name="state"
              value={personalInfo.state}
              onChange={handleChange}
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
            >
              <option className="text-dark_purple font-semibold" value="">--Select State--</option>
              {states.map((state) => (
                <option key={state} className="text-dark_purple font-semibold" value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Number */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="number">
              Phone Number: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.number}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="text"
              name="number"
              value={personalInfo.number}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* City */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="city">
              City: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.city}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="text"
              name="city"
              value={personalInfo.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </div>
        </div>

        {/* Right Form Fields */}
        <div className="w-full">
          {/* Date of Birth */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="dateOfBirth">
              Date of Birth: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.dateOfBirth}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="date"
              name="dateOfBirth"
              value={personalInfo.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="gender">
              Gender: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.gender}</span>
            </label>
            <select
              name="gender"
              value={personalInfo.gender}
              onChange={handleChange}
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
            >
              <option className="text-dark_purple font-semibold" value="">--Select Gender</option>
              <option className="text-dark_purple font-semibold" value="male">Male</option>
              <option className="text-dark_purple font-semibold" value="female">Female</option>
            </select>
          </div>

          {/* Address */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="address">
              Address: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.address}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="text"
              name="address"
              value={personalInfo.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Local Government Area */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="localGovernment">
              LGA: <span className="text-red-500 text-2xl"></span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{errors.localGovernment}</span>
            </label>
            <select
              name="localGovernment"
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
              onChange={handleChange}
            >
              <option className="text-dark_purple font-semibold" value="">--Select LGA</option>
              {/* Populate with actual LGA options based on state or country */}
              <option className="text-dark_purple font-semibold" value="north_york">North York</option>
              <option className="text-dark_purple font-semibold" value="ikorodu">Ikorodu</option>
            </select>
          </div>
        </div>
      </form >

      {/* Navigation Buttons */}
      < div className="flex justify-between items-center my-10 md:mt-20" >
        <button onClick={() => navigate("/login")} className="bg-white_gray px-6 py-2 text-dark_purple rounded-3xl border-2 font-bold border-transparent hover:border-customPurple">Back</button>
        <button
          onClick={() => {
            console.log("Button Clicked!");
            handleNext();
          }}
          className="bg-dark_purple py-2 px-8 rounded-3xl text-white font-bold border-2 border-transparent hover:bg-white_gray hover:text-dark_purple hover:border-dark_purple"
        >
          Next
        </button>

      </div >
    </div >
  )
};

export default PersonalInformation;

