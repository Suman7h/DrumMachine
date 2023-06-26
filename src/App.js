
import './App.css';
import {useEffect, useState} from 'react';


function App() {

  const [key,setKey]=useState('')
  const [power,setPower]=useState(true)
  const [clickedPad, setClickedPad] = useState(null);

  useEffect(() => {

    const handleKeyDown = (event) => {
      if (power === true) {
        playSound(event.key.toUpperCase());
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [power]);
  
  
  const drumSrc = [
    {
      keyCode: 81,
      unq: "drum-Q",
      name: "Heater 1",
      text: "Q",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      keyCode: 87,
      unq: "drum-W",
      name: "Heater 2",
      text: "W",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      keyCode: 69,
      unq: "drum-E",
      name: "Heater 3",
      text: "E",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      keyCode: 65,
      unq: "drum-A",
      name: "Heater 4",
      text: "A",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      keyCode: 83,
      unq: "drum-S",
      name: "Clap",
      text: "S",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      keyCode: 68,
      unq: "drum-D",
      name: "Open HH",
      text: "D",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    },
    {
      keyCode: 90,
      unq: "drum-Z",
      name: "Kick n' Hat",
      text: "Z",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    },
    {
      keyCode: 88,
      unq: "drum-X",
      name: "Kick",
      text: "X",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    },
    {
      keyCode: 67,
      unq: "drum-C",
      name: "Closed HH",
      text: "C",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
    }
  ];

  const playSound = (select)=>{
    const audio= document.getElementById(select)
    if(!audio){
      return;
    }
    audio.play();
    setKey(select);
    setClickedPad(select);
    setTimeout(() => {
      setClickedPad(null); 
    }, 140);
  }


  const handlePower =()=>{
    setPower(!power)
  }
  return (
    <div className="App">
      <div className="drum-machine" id="drum-machine">
        <div className='drum'>
          {drumSrc.map((drumPad)=> <button key={drumPad.unq} className={`drum-pad ${clickedPad === drumPad.name ? 'clicked' : ''}`} onClick={()=>power && playSound(drumPad.name)} id={drumPad.unq}>{drumPad.text}
          <audio src={drumPad.src}className="clip" id={drumPad.name}></audio>
          </button> )}
        </div >
        <div className='sidebar'>
          <div className='title'>Drum Machine</div>
          <div className='power'>Power</div>
          <label  className='switch'>
            <input type="checkbox" defaultChecked />
            <span onClick={handlePower} className='slider' />
         </label>
         <div id="display">{power? key: " "}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
