import Header from "../components/Header";
import Table from "../components/tracker/Table";

const Tracker = () => {
  return (
    <>
      <Header />

      <span className="block mt-20"></span>

      <main className="tracker flex flex-col text-center justify-center place-items-center pt-10">
        <h1 className="text-5xl font-semibold">
          <span className="text-blue">Track</span> your Nutrients!
        </h1>

        <hr className="border-black w-[60%] my-6" />

        <Table />
      </main>
    </>
  );
};

export default Tracker;
