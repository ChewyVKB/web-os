import "./index.css";
import { useRef } from "react";
import { scaleValue } from "./utils/scales";
import {useState, useEffect} from 'react';


const maxAdditionalSize = 5;

function App() {
  const [state, setState] = useState('start')
  const [dateState, setDateState] = useState(new Date());
    useEffect(() => {
           setInterval(() => setDateState(new Date()), 3000);
    }, []);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleAppHover = (ev: React.MouseEvent<HTMLLIElement>) => {
    if (!dockRef.current) return;

    const mousePosition = ev.clientX;
    const iconPositionLeft = ev.currentTarget.getBoundingClientRect().left;
    const iconWidth = ev.currentTarget.getBoundingClientRect().width;

    const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    );

    dockRef.current.style.setProperty(
      "--dock-offset-left",
      `${offsetPixels * -1}px`
    );

    dockRef.current.style.setProperty(
      "--dock-offset-right",
      `${offsetPixels}px`
    );
  };
  return (
<body>



  <div className="topnav">
    <div className="topDate">
    <h5>{' '}{dateState.toLocaleDateString('en-US', {month: 'short', day: 'numeric',})} 
    <> </>{dateState.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true,})}
    </h5></div>
  </div> 



  <div className="desktop">
  <a href="link address" >
  <img className="desktopapp"  width="125px" height="125px" src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/a819aac512e7261fee3310f1bbdaada7_aExwB3ULuk.png" /></a>
  <p className="apptext">User Info</p>
  <a href="link address" >
  <img className="desktopapp" width="125px" height="125px" src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/a819aac512e7261fee3310f1bbdaada7_aExwB3ULuk.png" /></a>
  <p className="apptext">Jobs</p>
  <a href="link address" >
  <img className="desktopapp" width="125px" height="125px" src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/d24cb4baa88ce0807a3231f1e6050a9c_XC6SSUY12m.png" /></a>
  <p className="apptext" margin-left="125px">Projects</p>
  </div> 



    <div className="page">
      <nav ref={dockRef} className="dock">
        <ul>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.facebook.com/" target="_blank">
              <img src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/b15615003b04ef31eaf42c678aa70e9c_hysKBBYO26.png" />
              <span className="tooltip">Facebook</span>
            </a>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.instagram.com/chewyvkb" target="_blank">
              <img src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/5866a477a620cad420515c3576227af1_90nJbRt5xN.png" />
              <span className="tooltip">Instagram</span>
            </a>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.twitter.com/flawlesschewyy" target="_blank">
              <img src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/a4cdd1aa629e384145eef0f402b69cc1_SLNRpzh1Jj.png" />
              <span className="tooltip">Twitter</span>
            </a>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.linkedin.com" target="_blank">
              <img src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/8750477cfad38b446528eb0d0e79b183_g4fzF4p1ly.png" />
              <span className="tooltip">LinkedIn</span>
            </a>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.youtube.com/" target="_blank"> 
              <img src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/0eba5707aac36dd4bd4f6eae271e023b_low_res_YouTube.png" />
              <span className="tooltip">Youtube</span>
            </a>
          </li>
          <li className="app" onMouseMove={handleAppHover}>
            <a href="https://www.github.com/chewyvkb" target="_blank">
              <img src="https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/4d578bdb5f8ec24bad6100b8ce0023b1_low_res_GitHubAlt.png" />
              <span className="tooltip">Github</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
</body>
  );
}

export default App;
