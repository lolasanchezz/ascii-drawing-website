"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
const styleFontHeight = 12;

const fontHeight = styleFontHeight * 1.2;
const fontWidth = styleFontHeight * 0.56;
const padding = 50;
export default function Home() {
  const [dimensions, setDimensions] = useState({
    w: window.innerWidth - padding,
    h: window.innerHeight - padding,
  });
  useEffect(() => {
    const s = () => {
      setDimensions({
        w: window.innerWidth - padding,
        h: window.innerHeight - padding,
      });
    };
    s();
  }, []);

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
  const [size, setSize] = useState(1);
  const [pickedChar, setChar] = useState("#");
  const [finalRender, setFinalRender] = useState(
    makeEmptyArr(dimensions.w, dimensions.h),
  );

  const Toolbar = () => {
    return (
      <div className={styles.toolBar}>
        <div className={styles.sizes}>
          <p>brush size:</p>
          <p
            onClick={() => {
              setSize(1);
            }}
          >
            1
          </p>
          <p
            onClick={() => {
              setSize(3);
            }}
          >
            3
          </p>
          <p
            onClick={() => {
              setSize(5);
            }}
          >
            5
          </p>
          <h4>current size: {size}</h4>
        </div>
        <div className={styles.charsBox}>
          <p>character:</p>
          <p
            onClick={() => {
              setChar("#");
            }}
          >
            #
          </p>
          <p
            onClick={() => {
              setChar(".");
            }}
          >
            .
          </p>
          <p
            onClick={() => {
              setChar("█");
            }}
          >█
            </p>
            <p
            onClick={() => {
              setChar("█");
            }}
          ></p>
          <p>
            eraser
          </p>
          <h4>current character: {pickedChar}</h4>
        </div>
        <p
        onClick={() => {
              setFinalRender(makeEmptyArr(dimensions.w, dimensions.h))
            }}
        >clear everything</p>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>ascii drawer 3000</h1>
        <Toolbar />
        <Easel
          width={dimensions.w}
          height={dimensions.h}
          setFinalRender={setFinalRender}
          finalRender={finalRender}
          pickedChar={pickedChar}
          size={size}
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
                      props.setFinalRender((arr) => {
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
