import "./App.css";
import { useState, useEffect } from "react";
import Resource from "./Resource";

function App() {
  const [resources, setResources] = useState([]);
  const [subject, setSubject] = useState([]);

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

  function filter(e) {
    if (e.target.checked) {
      setSubject([...subject, e.target.value]);
    } else {
      setSubject(subject.filter((i) => i !== e.target.value));
    }
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
          <form>
            {Object.keys(resources).map((item) => (
              <div key={item} className="mb-3 ">
                <input
                  type="checkbox"
                  id={item}
                  name={item}
                  className="mr-3"
                  value={item}
                  onClick={(event) => filter(event)}
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
        <div className="border flex-[70%] p-6">
          <div className="mb-3">Resources</div>
          {subject.length === 0
            ? Object.keys(resources).map((item) => {
                return (
                  <div key={item} className={item}>
                    {resources[item].map((resource, index) => (
                      <Resource key={index} resource={resource} />
                    ))}
                  </div>
                );
              })
            : subject.map((item) => {
                return (
                  <div key={item} className={item}>
                    {resources[item].map((resource, index) => (
                      <Resource key={index} resource={resource} />
                    ))}
                  </div>
                );
              })}
        </div>
      </main>
    </div>
  );
}

export default App;
