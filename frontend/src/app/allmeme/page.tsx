'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemeDisplay from '../eachmeme/page';
import { useCookies } from 'react-cookie';
import s from './allmeme.module.css';

interface Meme {
  id: number;
  meme_title: string;
  meme_description: string;
  meme_image: string | null;
  likes: number[];
}

export default function AllMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [cookies, setCookie] = useCookies(['username']);
  const username = cookies.username;
  const likeMeme = async (memeId: number) => {
    try {
      const formData = new FormData();
      formData.append('username', username); 
      await axios.post(`http://127.0.0.1:8000/api/save_meme/${memeId}/like/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchMemes();
    } catch (error) {
      console.error('Failed to like meme', error);
    }
  };

  const fetchMemes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/save_meme/');
      setMemes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch memes', error);
    }
  };

  useEffect(() => {
    fetchMemes(); // Load memes when the component mounts
  }, []);

  return (
    <main>
      <div className={s.all_meme}>
        <h1>All Memes</h1>
        {memes.map((meme) => (
          meme.meme_image && (
            <div key={meme.id}>
              <MemeDisplay
                randomImage={meme.meme_image}
                topText={meme.meme_title}
                bottomText={meme.meme_description}
                likes={meme.likes}
                onLike={() => likeMeme(meme.id)}
              />
            </div>
          )
        ))}
      </div>
    </main>
  );
}
