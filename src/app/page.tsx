"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
export default function Home() {
  const width = window.innerWidth - 100;
  const height = window.innerHeight - 100;
  const [size, setSize] = useState(1);
  const [char, setChar] = useState("#");

  const Toolbar = () => {
    return (
      <div className={styles.toolBar}>
        <div className={styles.sizes}>
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
            1
          </p>
          <p
            onClick={() => {
              setSize(5);
            }}
          >
            1
          </p>
        </div>
        <div className={styles.charsBox}>
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
          >
            █
          </p>
        </div>
      </div>
    );
  };

  const Easel = (props: { width: number; height: number }) => {
    const styleFontHeight = 12;
    const fontHeight = styleFontHeight * 1.2;
    const fontWidth = styleFontHeight * 0.56;

    const [mouseDown, setMouseDown] = useState(false);
    const [finalRender, setFinalRender] = useState([] as string[][]);

    useEffect(() => {
      let tmpArray = [];
      for (let i = 0; i < props.height / fontHeight; i++) {
        tmpArray[i] = [];
        for (let j = 0; j < props.width / fontWidth; j++) {
          //tmpArray[i].push("#");
          tmpArray[i].push("⠀");
        }
      }
      setFinalRender(tmpArray);
    }, [props.width, props.height]);
    //unbelievable
    function updateRender(
      xPos: number,
      yPos: number,
      newChar: string,
      size: number,
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
     
      let curCoordInd = 0;
      const newArr = finalRender.map((arr, i) => {
        if (curCoordInd >= pos.length) {
          console.log("reached end")
          return arr}
        if (i === pos[curCoordInd][1]) {
          return arr.map((char, i2) => {
            
             if (curCoordInd >= pos.length) {
          console.log("reached end")
          return char}
            if (i2 === pos[curCoordInd][0]) {
              console.log("updated");
              console.log(curCoordInd)
              curCoordInd++;
              return newChar;
            } else {
              return char;
            }
          });
        } else {
          return arr;
        }
      });

      setFinalRender(newArr);
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
        {finalRender.map((row, i) => {
          return (
            <div key={i}>
              {row.map((char, j) => {
                return (
                  <span
                    className={styles.char}
                    key={j}
                    onMouseOver={(client) => {
                      if (mouseDown) {
                        updateRender(j, i, "#", size);
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

  return (
    <div className={styles.page}>
      <h1>ascii drawer 3000</h1>
      <main className={styles.main}>
        <Toolbar />
        <Easel width={width} height={height}></Easel>
      </main>
    </div>
  );
}
