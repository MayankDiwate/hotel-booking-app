const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="flex justify-between items-center mx-auto container">
        <span className="font-bold text-3xl text-white tracking-tight">
          MERN Booking App
        </span>
        <span className="flex gap-4 font-bold text-white tracking-tight">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
