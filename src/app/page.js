import PopularSlider from "./components/popularSlider/popularSlider";

export default function Home() {
  return (
    <>
      <h1 className="text-center mt-10 font-bold lg:text-5xl md:text-4xl text-3xl animate-pulse text-yellow-400">
       Popular dishes
      </h1>
      <div className="md:mt-10 mt-8">
        <PopularSlider />
      </div>
    </>
  );
}
