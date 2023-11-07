import React, { useState, useEffect } from 'react';


export const Trafficlight = () => {
    const [lightClass, setLightClass] = useState(0);
    const [autoOn, setAutoOn] = useState(false);
    const [purple, setPurple] = useState(false)

    function handleLightClick(n){
       setLightClass(n)
    }

    useEffect(() =>{
      let interval;
      if(autoOn){
        interval = setInterval(() =>{
        setLightClass((prevLightClass)=> {
            if (prevLightClass === 0) return 1;
            if (prevLightClass === 1) return 2; 
            if (prevLightClass === 2) return 3; 
            if (prevLightClass === 3 && purple) return 4;
            if (prevLightClass === 3 && !purple) return 1; 
            if (prevLightClass === 4) return 1;
            
            return prevLightClass
        })
        }, 1000)
      }
      return () => clearInterval(interval)
    }, [autoOn, purple])

    function autoToggle(){
        setAutoOn(!autoOn)
    } 
     
    function handlePurple(){
      setPurple(!purple)
    }
    
    return (
      <div className="container">
        <div className="semaphore">
          <div onClick={() => handleLightClick(1)} className={`${lightClass === 1 ? 'red-lighted' : 'red'}`} id="red-light"></div>
          <div onClick={() => handleLightClick(2)} className={`${lightClass === 2 ? 'orange-lighted' : 'orange'}`} id="orange-light"></div>        
          <div onClick={() => handleLightClick(3)} className={`${lightClass === 3 ? 'green-lighted' : 'green'}`} id="green-light"></div>
          <div className="purple-container" style={purple ? {display: "flex"} : {display: "none"}}>
            <div onClick={() => handleLightClick(4)} className={`${lightClass === 4 ? 'purple-lighted' : 'purple'}`} id="green-light"></div>
          </div>
          
        </div>
        <button onClick={autoToggle}>{autoOn ? "Stop" : "Auto"}</button>
        <button onClick={handlePurple}>{purple ? "Turon off purple" : "Turn on purple"}</button>
      </div>
    );
  }