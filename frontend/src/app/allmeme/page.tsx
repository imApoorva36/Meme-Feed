// pages/allMemes.tsx
'use client'; // Add this line to mark the component as a Client Component
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import MemeDisplay  from '../eachmeme/page';
import s from './allmeme.module.css'

export default function AllMemes() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    // Fetch all memes from your Django API
    axios.get('http://127.0.0.1:8000/api/save_meme/')
      .then((response) => {
        setMemes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch memes', error);
      });
  }, []);


  return (
    <main>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>All Memes</h1>
        <div className={s.all_meme}>
          {memes.map((meme, index) => (
                  <MemeDisplay
                  randomImage={meme.meme_image}
                  topText={meme.meme_title}
                  bottomText={meme.meme_description}
                />
          ))}
        </div>
      </div>
    </main>
  );
}
