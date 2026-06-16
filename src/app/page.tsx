'use client'
import styles from "./page.module.css";
import { useState, useEffect } from "react";
export default function Home() {
  
  const width = 500;
  const height = 500;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Easel width={width} height={height} ></Easel>
      </main>
    </div>
  );
}

const Easel = (props: { width: number; height: number }) => {
  const fontHeight = 12;
  const fontWidth = 10;
  const [finalRender, setFinalRender] = useState([] as string[][])
 
  useEffect(() => {
    let tmpArray = []
    for (let i = 0; i < (props.height/fontHeight); i++) {
      tmpArray[i] = [];
      for (let j = 0; j < (props.width/fontWidth); j++) {
        tmpArray[i].push(" ");
      }
    }
    setFinalRender(tmpArray)
  }, [props.width, props.height]);
  console.log(finalRender)
  return (
    <div className={styles.easelDiv} style={{width: props.width, height: props.height}}>
      {finalRender.map((row, i) => {
        console.log(row)
        return (
          <p key = {i}>{row.join("")}</p>
        )
      })}
    </div>
  )
};
