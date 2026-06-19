"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
const styleFontHeight = 12;

const fontHeight = styleFontHeight * 1.2;
const fontWidth = styleFontHeight * 0.56;
const padding = 50;

function makeEmptyArr(width: number, height: number) {
  let tmpArray: string[][] = [];
  for (let i = 0; i < height / fontHeight; i++) {
    tmpArray[i] = [];
    for (let j = 0; j < width / fontWidth; j++) {
      //tmpArray[i].push("#");
      tmpArray[i].push("⠀");
    }
  }
  return tmpArray;
}

export default function Home() {
  const [dimensions, setDimensions] = useState({
    w: typeof window !== "undefined" ? window.innerWidth - padding : 800,
    h: typeof window !== "undefined" ? window.innerHeight - padding : 500,
  });
  useEffect(() => {
    const s = () => {
      setDimensions({
        w: typeof window !== "undefined" ? window.innerWidth - padding : 800,
        h: typeof window !== "undefined" ? window.innerHeight - padding : 500,
      });
    };
    s();
  }, []);

  const [size, setSize] = useState(1);
  const [pickedChar, setChar] = useState("#");
  const [bgColor, setBgColor] = useState("#8894ff");
  const [tempColor, setTempColor] = useState("#8894ff");
  const [finalRender, setFinalRender] = useState(
    makeEmptyArr(dimensions.w, dimensions.h),
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>ascii drawer 3000</h1>
        <Toolbar
          setSize={setSize}
          setChar={setChar}
          bgColor={bgColor}
          setBgColor={setBgColor}
          size={size}
          dimensions={dimensions}
          setFinalRender={setFinalRender}
          pickedChar={pickedChar}
        />
        <Easel
          width={dimensions.w}
          height={dimensions.h}
          setFinalRender={setFinalRender}
          finalRender={finalRender}
          pickedChar={pickedChar}
          size={size}
          color={bgColor}
        ></Easel>
      </main>
    </div>
  );
}

const Easel = (props: {
  width: number;
  height: number;
  setFinalRender: any;
  finalRender: string[][];
  pickedChar: string;
  size: number;
  color: string;
}) => {
  const [mouseDown, setMouseDown] = useState(false);

  //unbelievable
  function updateRender(
    xPos: number,
    yPos: number,
    newChar: string,
    size: number,
    finalRender: string[][],
  ) {
    //attempt to make circle brushes
    let pos: number[][] = [];
    if (size > 1) {
      for (let x = xPos - size; x < xPos + size; x++) {
        for (let y = yPos - size; y < yPos + size; y++) {
          pos.push([x, y]);
        }
      }
    } else {
      pos = [[xPos, yPos]];
    }
    const coords = new Set(pos.map(([x, y]) => `${x},${y}`));
    console.log(pos);
    let curCoordInd = 0;
    const newArr = finalRender.map((row, y) =>
      row.map((char, x) => (coords.has(`${x},${y}`) ? newChar : char)),
    );
    return newArr;
  }

  return (
    <div
      className={styles.easelDiv}
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        fontSize: styleFontHeight,
        backgroundColor: props.color,
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        setMouseDown(true);
      }}
      onMouseUp={() => setMouseDown(false)}
    >
      {props.finalRender.map((row, i) => {
        return (
          <div key={i}>
            {row.map((char, j) => {
              return (
                <span
                  className={styles.char}
                  key={j}
                  onMouseOver={(client) => {
                    if (mouseDown) {
                      props.setFinalRender((arr: string[][]) => {
                        const r = updateRender(
                          j,
                          i,
                          props.pickedChar,
                          props.size,
                          arr,
                        );
                        return r;
                      });
                    }
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const Toolbar = (props: {
  setSize: any;
  setChar: any;
  pickedChar: any;
  size: any;
  dimensions: any;
  setFinalRender: any;
  setBgColor: any;
  bgColor: any;
}) => {
  return (
    <div className={styles.toolBar}>
      <div className={styles.sizes}>
        <p>brush size:</p>
        <p
          onClick={() => {
            props.setSize(1);
          }}
        >
          1
        </p>
        <p
          onClick={() => {
            props.setSize(3);
          }}
        >
          3
        </p>
        <p
          onClick={() => {
            props.setSize(5);
          }}
        >
          5
        </p>
        <h4>current size: {props.size}</h4>
      </div>
      <div className={styles.charsBox}>
        <p>character:</p>
        <p
          onClick={() => {
            props.setChar("#");
          }}
        >
          #
        </p>
        <p
          onClick={() => {
            props.setChar(".");
          }}
        >
          .
        </p>
        <p
          onClick={() => {
            props.setChar("█");
          }}
        >
          █
        </p>
        <p
          onClick={() => {
            props.setChar("█");
          }}
        ></p>
        <p>eraser</p>
        <h4>current character: {props.pickedChar}</h4>
      </div>
      <p
        onClick={() => {
          props.setFinalRender(
            makeEmptyArr(props.dimensions.w, props.dimensions.h),
          );
        }}
      >
        clear everything
      </p>
      <div className={styles.colorPickerDiv}>
        <p>background color:</p>
        <input
          type="color"
          value={props.bgColor}
          onChange={(e) => {
            props.setBgColor(e.target.value);
          }}
          // onBlur = {() => setBgColor(tempColor)}
        />
      </div>
    </div>
  );
};
