'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemeDisplay from '../eachmeme/page';
import s from './allmeme.module.css';

interface Meme {
  id: number;
  meme_title: string;
  meme_description: string;
  meme_image: string | null;
}

export default function AllMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/save_meme/');
        setMemes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch memes', error);
      }
    };

    fetchMemes();
  }, []);

  return (
    <main>
      <div className={s.all_meme}>
        <h1>All Memes</h1>
        {memes.map((meme) => (
          meme.meme_image && (
            <MemeDisplay
              key={meme.id}
              randomImage={meme.meme_image}
              topText={meme.meme_title}
              bottomText={meme.meme_description}
            />
          )
        ))}
      </div>
    </main>
  );
}
