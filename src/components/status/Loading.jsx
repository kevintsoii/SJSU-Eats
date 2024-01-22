const Dot = () => {
  return <span className="dot bg-blue rounded-lg w-[15px] h-[15px] m-2"></span>;
};

const Error = () => {
  return (
    <div className="flex items-center h-20">
      <Dot />
      <Dot />
      <Dot />
    </div>
  );
};

export default Error;
