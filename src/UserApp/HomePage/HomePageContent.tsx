import Authentication from "./Components/Authentication";
import Banner from "./Components/Banner";
import CollectionSection from "./Components/CollectionSection";

export default function HomePageContent() {
  return (
    <div className="">
      <div className="flex flex-row flex-wrap justify-between pb-5">
        <div className="w-full lg:w-[70%]">
          <Banner />
        </div>
        <Authentication />
      </div>
      <div className="flex flex-col gap-10">
        <CollectionSection />
      </div>
    </div>
  );
}
