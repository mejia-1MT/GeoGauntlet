import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Population.css';

const Population = () => {
  let { state } = useLocation();
  const [countryList, setCountryList] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null); 
  const [animate, setAnimate] = useState(null);

  const fillCountries = () => {
    const newList = [...countryList];

    while (newList.length < 20) {
      newList.push(state.countries[Math.floor(Math.random() * state.countries.length)]);
    }

    setCountryList(newList);
  };

  useEffect(() => {
    fillCountries();
  }, []);

  const handleAnswer = (answer, index) => {
    setAnswered(true);
    const correctAnswer = countryList[0].population < countryList[index].population;

    if (correctAnswer === answer) {
      alert('Correct');
      setAnimate(true)
      setTimeout(()=> { 
        setCountryList(prev => prev.slice(1))
        setAnimate(false)
        setClickedIndex(false)
      }, 1000)

    } else {
      alert('Incorrect');
    }

    setClickedIndex(index); // Update clicked index
  
 
  };

  return (
    <div className="Population">
      <div className={`population-slider`}>
        {countryList.slice(0, 3).map((country, index) => (
          <div key={index} className={`population-choices ${animate ? 'population-slide' : ''}`}
          style={{ backgroundImage: `url(${country.flag})` }}>
           <div className='population-inset'>
            <div className='population-country-name'>"{country.name}"</div>
              {index !== 0 ? (
                <div>
                  {answered && clickedIndex === index ? ( 
                    <div className='population-country-population'>{country.population.toLocaleString()}</div>
                  ) : (
                    <>
                      <button onClick={() => handleAnswer(true, index)}>Higher</button>
                      <button onClick={() => handleAnswer(false, index)}>Lower</button>
                    </>
                  )}
                </div>
              ) : (
                <div className='population-country-population'>{country.population.toLocaleString()}</div>
              )}
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Population;
