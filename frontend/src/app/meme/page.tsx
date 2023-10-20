
'use client'; // Add this line to mark the component as a Client Component
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import s from './meme.module.css';
import html2canvas from 'html2canvas';
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

        const axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const response2 = await axios.post('http://127.0.0.1:8000/api/save_meme/', formData, axiosConfig);

        // Handle the response, e.g., show a success message
        console.log('Meme saved successfully!', response2.data);
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
    if (memeContainerRef.current) {
      // Create an Image object for the meme image
      const image = new Image();
      image.crossOrigin = 'anonymous'; // Allow cross-origin image
      image.src = meme.randomImage;

      image.onload = function () {
        // Set the canvas dimensions to match the image dimensions
        const canvasWidth = image.width; // Set canvas width to match the image width
        const canvasHeight = image.height; // Set canvas height to match the image height

        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Draw the image on the canvas
          ctx.drawImage(image, 0, 0);

          // Apply text styles
          ctx.font = '3em impact, sans-serif'; // Adjust the font size as needed
          ctx.textAlign = 'center';
          ctx.fillStyle = 'white';

          // Add a text shadow
          ctx.shadowColor = 'black';
          ctx.shadowBlur = 5; // Adjust the blur as needed
          ctx.shadowOffsetX = 2; // Adjust the X offset as needed
          ctx.shadowOffsetY = 2; // Adjust the Y offset as needed

          // Calculate text position for the top text
          const textTopX = canvasWidth / 2;
          const textTopY = canvasHeight * 0.1;
          ctx.textBaseline = 'top'; // Set text baseline to align from the top
          ctx.fillText(meme.topText.toUpperCase(), textTopX, textTopY);

          // Calculate text position for the bottom text
          const textBottomX = canvasWidth / 2;
          const textBottomY = canvasHeight * 0.9;
          ctx.textBaseline = 'bottom'; // Set text baseline to align from the bottom
          ctx.fillText(meme.bottomText.toUpperCase(), textBottomX, textBottomY);

          // Create a data URL for the canvas
          const dataURL = canvas.toDataURL('image/png');

          // Create a temporary link element to trigger the download
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'meme.png';

          // Trigger a click event on the link to download the image
          link.click();
        }
      };
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
      </div>
      <MemeDisplay
        randomImage={meme.randomImage}
        topText={meme.topText}
        bottomText={meme.bottomText}
      />
    </main>
  );
}
