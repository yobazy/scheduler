import React, { Fragment, useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace=false) { 
    if(replace) {
      let newHist = [...history]
      newHist.pop()
      setHistory([...newHist, nextMode])
    } else  {
      setHistory([...history, nextMode])
    }
    setMode(nextMode)
  }
  function back() { 
    if (mode === initial) {
      return mode;
    }
    setMode(history[history.length-2])
    history.pop()
    setHistory(history)
    return mode;
  }

  return { mode, transition, back };
};