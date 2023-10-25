# Meme Feed
This is a Repository for the Web Enthusiasts Club's Recruitment of Google Developers Student Clubs SIG. [Apoorva](https://github.com/imApoorva36) and [Sanjeev Holla S](https://github.com/sanjeevholla26) colaborated to do this project.

## Video Recording
#### The Recording of the functioning with detailed explanation of our Meme Feed Project can be found [here](https://drive.google.com/file/d/17x2AKoKNZJsnR0dy-kuKwXmVDm2xRpu4/view?usp=sharing)


## Installation instructions

- Clone this repository first.
  <br>
  
      git clone https://github.com/imApoorva36/Meme-Feed.git

  <br>
- Go to /frontend folder and run the following command.
  <br>

      npm install
  <br>

      npm run dev

  <br>
- Now go to /backend folder and run the migrations.
  <br>

      python3 manage.py makemigrations
  <br>

      python3 manage.py migrate

  <br>
- Run the backend server.
  <br>

      python3 manage.py runserver

  <br>
## Project details

The features in this project are

- Registration and login: **JWT tokens** (Access token and refresh token) have been used for the purpose of user authentication and authorization. 
- Meme creation: Loged in users can create memes. For creating the memes users can select images and they can give the **Top text** and **Bottom Text**. **Imgflip API** is used to get the meme images. 
- Downloading the Meme generated: On creating the meme that they want, users can download the meme as an image in png format and save it in their devices.
- Uploading the meme to Meme Feed: This project works as a social media platform for memes. So on creating the memes users can upload the meme so that other users can see that meme.
- Liking memes: Loged in users can like the Memes. User can like one meme only once.
