import alert from "../assets/Images/image (1).png"

const AlertBanner = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-[#FF0000] p-6 text-white md:flex-row">
      {/* Text Section */}
      <div className="space-y-2">
        <p className="text-md font-bold uppercase">Note</p>
        <h3 className="text-3xl font-bold leading-snug">
          We are strictly remote, report any <br />
          physical meeting request
        </h3>
        <p className="font-medium text-white/80">
          Don’t accept any physical meeting
        </p>
      </div>

      {/* Image Section */}
      <div className="w-[30%]">
      <img
        src= {alert}
        alt="Alert Notice"
        className="w-full object-contain"
      />
      </div>
    </div>
  );
};

export default AlertBanner;
