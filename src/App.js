import "./App.css";
import { useState, useEffect } from "react";
import Resource from "./Resource";
import Pagination from "./Pagination";

function App() {
  const [resources, setResources] = useState([]);
  const [subject, setSubject] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const resourcesPerPage = 7;

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then(
        (data) => {
          //console.log(data);
          setResources(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }, []);

  function handleClick(e) {
    if (e.target.checked) {
      setSubject([...subject, e.target.value]);
    } else {
      setSubject(subject.filter((i) => i !== e.target.value));
    }
    setCurrentPage(1);
  }

  /**
   * Pagination
   **/

  //concat arrays
  let arr = [];
  Object.keys(resources).map((category) => {
    return (arr = arr.concat(resources[category]));
  });

  let filter = [];
  if (subject.length !== 0) {
    subject.map((category) => {
      return (filter = filter.concat(resources[category]));
    });
  }

  let array = subject.length === 0 ? arr : filter;
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = array.slice(
    indexOfFirstResource,
    indexOfLastResource
  );

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(array.length / resourcesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="font-spartan container mx-auto bg-light-grayish-cyan">
      <header className="bg-mobile md:bg-desktop bg-dark-cyan bg-no-repeat bg-cover h-24">
        <h2 className="text-light-grayish-cyan text-center text-2xl leading-[4]">
          Awesome Learning Resources
        </h2>
      </header>
      <main className="md:flex ">
        <div className="border flex-[30%] p-6">
          <div className="mb-3 ">Subject</div>
          <form className="h-[75vh] overflow-y-scroll">
            {Object.keys(resources).map((item) => (
              <div key={item} className="mb-3 ">
                <input
                  type="checkbox"
                  id={item}
                  name={item}
                  className="mr-3"
                  value={item}
                  onClick={(event) => handleClick(event)}
                />
                <label
                  htmlFor={item}
                  className="cursor-pointer hover:text-primary"
                >
                  {item}
                </label>
              </div>
            ))}
          </form>
        </div>
        <div className="border flex-[70%] p-6 flex flex-col justify-between">
          <div>
            <div className="mb-3">Resources</div>
            {subject.length === 0
              ? currentResources.map((resource, index) => (
                  <Resource key={index} resource={resource} />
                ))
              : currentResources.map((resource, index) => (
                  <Resource key={index} resource={resource} />
                ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pageNumbersLength={pageNumbers.length}
            results={subject.length === 0 ? arr.length : filter.length}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
