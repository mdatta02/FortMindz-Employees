import Navbar from "./Navbar";
import AddEmployee from "./AddEmployee";
import ListEmployee from "./ListEmployee";

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="w-100">
        <AddEmployee />
        <ListEmployee />
      </div>
    </>
  );
};

export default Main;
