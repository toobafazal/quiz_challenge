import React from "react";
import { useState, useEffect } from "react";

 function Timer(
    { 
    startingMinutes = 0,
    startingSeconds = 45,
    func,
    stopTimer = false,
 })
  {
    const [mins, setMinutes] = useState(startingMinutes);
    const [secs, setSeconds] = useState(startingSeconds);

    useEffect(() => {
        let sampleInterval = setInterval(() => {
            if (!stopTimer) {
                if (secs > 0) {
                    setSeconds(secs - 1);
                }
                if (secs === 0) {
                    if (mins === 0) {
                        clearInterval(sampleInterval);
                        func();
                        setSeconds(startingSeconds);
                    } else {
                        setMinutes(mins - 1);
                        setSeconds(59);
                    }
                }
            }
            else { setSeconds(startingSeconds) }
        }, 1000);

        return () => {
            clearInterval(sampleInterval);
        };
    });

    return (
        <div>
            {(stopTimer ?
                <span className="timer">0:00</span>
                :
                <span className="timer">
                    {mins}:{secs < 10 ? `0${secs}` : secs}
                </span>
            )}
        </div>
    );
}

export default Timer