import MainBlock from "../components/MainBlock"; // Importing the MainBlock component.
import Info from "../components/Info"; // Importing the Info component.

function Home() {
  // The Home component is a functional component responsible for rendering the home page of the application.

  // It returns a fragment (denoted by <> </>) containing two components: MainBlock and Info.

  return (
    <>
      {/* Render the MainBlock component */}
      <MainBlock />
      
      {/* Render the Info component */}
      <Info />
    </>
  );
}

export default Home;
