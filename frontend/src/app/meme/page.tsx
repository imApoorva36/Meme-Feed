'use client'
import React, { useState, useEffect, ChangeEvent } from "react";
import s from './meme.module.css'
// import ENDPOINT from '@/helpers/endpoint'
// import { useRouter } from 'next/navigation';

interface Meme {
  topText: string;
  bottomText: string;
  randomImage: string;
}

interface MemeData {
  url: string;
}

export default function Meme() {
  const [meme, setMeme] = useState<Meme>({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  const [allMemes, setAllMemes] = useState<MemeData[]>([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.memes) {
          setAllMemes(data.data.memes);
        }
      });
  }, []);

  function getMemeImage() {
    if (allMemes.length > 0) {
      const randomNumber = Math.floor(Math.random() * allMemes.length);
      const url = allMemes[randomNumber].url;
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: url
      }));
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value
    }));
  }

  return (
    <main>
        <br /><br />
      <div className={s.form}>
        <input
          type="text"
          placeholder="Top text"
          className={s.forminput}
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className={s.forminput}
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className={s.formbutton} onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className={s.meme}>
        <img src={meme.randomImage} alt="Meme" className={s.memeimage} />
        <h2 className={s.memetexttop}>{meme.topText}</h2>
        <h2 className={s.memetextbottom}>{meme.bottomText}</h2>
      </div>
    </main>
  );
}