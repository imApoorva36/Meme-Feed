
'use client'; // Add this line to mark the component as a Client Component
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useAuth } from '../useAuth'; // Import the useAuth hook
import s from './meme.module.css';
import { useCookies } from 'react-cookie'; // Import the useCookies hook
import axios from 'axios';
import MemeDisplay from '../eachmeme/page'


interface Meme {
  topText: string;
  bottomText: string;
  randomImage: string;
}

interface MemeData {
  url: string;
}

export default function Meme() {
    useAuth();
    const [cookies] = useCookies(['access_token']);
    const access_token = cookies.access_token;
    // console.log(access_token);
  const [meme, setMeme] = useState<Meme>({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  });
  const [allMemes, setAllMemes] = useState<MemeData[]>([]);
  const memeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
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
        randomImage: url,
      }));
    }
  }

  async function saveMeme() {
    try {
        const formData = new FormData();
        formData.append('meme_title', meme.topText);
        formData.append('meme_description', meme.bottomText);

        // Create a Blob from the image URL
        const response1 = await fetch(meme.randomImage);
        const blob = await response1.blob();

        // Append the image as a file
        formData.append('meme_image', blob, 'meme.jpg');
        console.log("THe access token", access_token);
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

        const response2 = await axios.post('http://127.0.0.1:8000/api/save_meme/', formData, axiosConfig);

        // Handle the response, e.g., show a success message
        console.log('Meme saved successfully!', response2.data);
        alert('Meme saved successfully!');
    } catch (error) {
        // Handle any errors, e.g., show an error message
        console.error('Failed to save meme', error);
    }
}


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function downloadMeme() {
    console.log('Button clicked');

    if (memeContainerRef.current) {
        console.log("entered");
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = meme.randomImage;

      image.onload = function () {
        console.log('Image loaded successfully');
        const canvasWidth = image.width;
        const canvasHeight = image.height;

        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext('2d');
        console.log(canvas);
        if (ctx) {
          console.log('Canvas context obtained');

          ctx.drawImage(image, 0, 0);
          ctx.font = '3em impact, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = 'white';

          ctx.shadowColor = 'black';
          ctx.shadowBlur = 5;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;

          const textTopX = canvasWidth / 2;
          const textTopY = canvasHeight * 0.1;
          ctx.textBaseline = 'top';
          ctx.fillText(meme.topText.toUpperCase(), textTopX, textTopY);

          const textBottomX = canvasWidth / 2;
          const textBottomY = canvasHeight * 0.9;
          ctx.textBaseline = 'bottom';
          ctx.fillText(meme.bottomText.toUpperCase(), textBottomX, textBottomY);

          const dataURL = canvas.toDataURL('image/png');

          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'meme.png';

          link.click();
          alert("Download Successful!!");
        }
      };

      image.onerror = function () {
        console.error('Image loading failed');
      };
    }
    else{
        console.log("If statement no entered!!")
    }
  }




  return (
    <main>
      <br />
      <br />
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
        <button className={s.downloadmemebutton} onClick={downloadMeme}>
          Download Meme 📥
        </button>
        <button className={s.downloadmemebutton} onClick={saveMeme}>
          Save meme
        </button>
      </div >
      <div ref={memeContainerRef} className={s.memeContainer}>
        <div className={s.meme_container}>
        <div className={s.meme}>
            <img src={meme.randomImage} alt="Meme" className={s.memeimage} /><br />
            <h2 className={s.memetexttop}>{meme.topText}</h2>
            <h2 className={s.memetextbottom}>{meme.bottomText}</h2>
        </div>
    </div>
      </div>
    </main>
  );
}
