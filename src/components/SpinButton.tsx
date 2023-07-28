import React, { useState, MouseEvent, useRef } from "react";

import "./SpinButton.css";

const SpinButton: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const countLiveRegionRef = useRef<HTMLDivElement>(null); // 이 줄을 추가하세요

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    announceLiveRegion(`성인 ${count + 1}`);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
    announceLiveRegion(`성인 ${count - 1}`);
  };

  const announceLiveRegion = (message: string) => {
    if (countLiveRegionRef.current) {
      countLiveRegionRef.current.innerText = message;
    }
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  // return 구문 안에 추가하세요
  return (
    <section className="spinButtonContainer">
      <div>
        <h1>승객 선택</h1>
        <div className="spinButtonLabel">
          <label>성인</label>
          <div
            className="helpIcon"
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
          >
            ?
            {isTooltipVisible && (
              <span className="tooltip">최대 인원수는 3명까지 가능합니다</span>
            )}
          </div>
        </div>
        <button
          onClick={decrement}
          className="spinButton"
          aria-label="성인 탑승자 한명 줄이기 버튼"
        >
          -
        </button>
        <div
          ref={countLiveRegionRef}
          aria-live="assertive"
          className="sr-only"
          style={{
            position: "absolute",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            width: "1px",
            height: "1px",
            margin: "-1px",
            padding: "0",
            border: "0",
          }}
        />

        <input
          type="text"
          role="spinbutton"
          readOnly
          className="spinButtonInput"
          value={count}
          aria-label="성인"
        />
        <button
          onClick={increment}
          className="spinButton"
          aria-label="성인 탑승자 한명 증가 버튼"
        >
          +
        </button>
      </div>
    </section>
  );
};

export default SpinButton;
