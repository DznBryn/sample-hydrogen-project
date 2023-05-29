import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.css';

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles },
  ];
};

const CountdownTimerBar = ({ enable, deadline, copy, bgColor }) => {

  const [showIt, setShowIt] = useState(false);
  const [timer, setTimer] = useState({ 'HR': '--', 'MIN': '--', 'SEC': '--' });
  const STORAGE_KEY = 'ctdwn_c';
  const MAIN_OFFSET_HEIGHT = useRef(null);

  useEffect(() => {

    const startIt = enable && (!sessionStorage.getItem(STORAGE_KEY)) && (!isExpired());

    if (startIt) {

      if (window instanceof Object) {
        MAIN_OFFSET_HEIGHT.current = (window.innerWidth <= 768) ? 50 : 54;
        startInterval();
      }

    }

  }, []);

  /**/

  function startInterval() {

    finishInterval();
    updateTimer();
    setShowIt(true);
    window.timerInterval = setInterval(updateTimer, 1000);

  }

  function finishInterval() {

    const INTERVAL = window.timerInterval;
    (INTERVAL) && clearInterval(INTERVAL);

  }

  function hideIt() {
    setShowIt(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  function updateTimer() {

    const { date, hour } = deadline;
    const CUR_DATE = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const DEADLINE = new Date(`${date} ${hour}:00`);

    const MS_ON_SECOND = 1_000;
    const MS_ON_MINUTE = (MS_ON_SECOND * 60);
    const MS_ON_HOUR = (MS_ON_MINUTE * 60);
    const DIFF_MS = (DEADLINE - CUR_DATE);

    const HR = {
      value: Math.floor(DIFF_MS / MS_ON_HOUR),
      remainder: (DIFF_MS % MS_ON_HOUR),
    };

    const MIN = {
      value: Math.floor(HR.remainder / MS_ON_MINUTE),
      remainder: ((DIFF_MS % MS_ON_HOUR) % MS_ON_MINUTE),
    };

    const SEC = {
      value: Math.floor(MIN.remainder / MS_ON_SECOND),
    };

    const getLabel = (data) => {
      const sDATA = data.value.toString();
      return sDATA.length < 2 ? `0${sDATA}` : sDATA;
    };

    const isCounterFinished = (HR.value <= 0) && (MIN.value <= 0) && (SEC.value <= 0);

    if (isCounterFinished) {

      hideIt();
      finishInterval();

    } else {

      setTimer({
        HR: getLabel(HR),
        MIN: getLabel(MIN),
        SEC: getLabel(SEC),
      });

    }

  }

  function isExpired() {
    const { date, hour } = deadline;
    const current = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const end = new Date(`${date} ${hour}:00`);

    return (current > end);
  }

  /**/

  return (
    <CountdownTimerBarView
      copy={copy}
      timer={timer}
      hideIt={hideIt}
      bgColor={bgColor}
      showIt={showIt}
    />
  );

};

export default CountdownTimerBar;

const CountdownTimerBarView = ({ copy, timer, hideIt, bgColor, showIt }) => {

  const Copy = () => (

    <div className={'cCopy'}>{copy}</div>

  );

  const Timer = () => (

    <div className={'cTimer'}>
      {
        Object.keys(timer).map((value) => <div key={value}>

          <div className={'group'}>

            <div>{timer[value][0]}</div>
            <div>{timer[value][1]}</div>
            <span>{value}</span>

          </div>

          <div className={'divider'}>:</div>

        </div>)
      }
    </div>

  );

  const CloseButton = () => (

    <div className={'closeButton'} onClick={hideIt}>
      <XIcon />
    </div>

  );

  /**/

  return (

    <div id="countdownClock" className={'container'} style={{ backgroundColor: bgColor, display: (showIt) ? 'flex' : 'none' }}>

      <div className={'elementsWrapper'}>
        <Copy />
        <Timer />
      </div>

      <CloseButton />

    </div>

  );

};

/**/

const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" color="white" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} /></svg>;