import Header from "../components/Header";

const Location = () => {
  return (
    <>
      <Header />
      <span className="block mt-20"></span>

      <div className="flex flex-col items-center justify-center h-[80vh] w-full gap-y-4 p-10">
        <h1 className="text-2xl font-semibold">SJSU Dining Commons</h1>
        <h2 className="text-xl">390 S 8th St, San Jose, CA 95112</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12689.426081900998!2d-121.8785124!3d37.3340674!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fccc7f334858d%3A0xd32f7dcecae2c209!2sSJSU%20Dining%20Commons!5e0!3m2!1sen!2sus!4v1712374406943!5m2!1sen!2sus"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-[90%] lg:w-[60%] h-full mt-6"
        ></iframe>
      </div>
    </>
  );
};

export default Location;
