"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
export default function Home() {
  const width = 500;
  const height = 500;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Easel width={width} height={height}></Easel>
      </main>
    </div>
  );
}

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
  function updateRender(width: number, height: number, newChar: string) {
    const newArr = finalRender.map((arr, i) => {
      if (i === height) {
        return arr.map((char, i2) => {
          if (i2 === width) {
            console.log("updated");
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
      style={{ width: `${props.width}px`, height: `${props.height}px`, fontSize: styleFontHeight}}
      onMouseDown={(e) => {
        e.preventDefault()
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
                className = {styles.char}
                  key={j}
                  onMouseOver={(client) => {
                    if (mouseDown) {
                      updateRender(j, i, "#");
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
