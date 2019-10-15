require('dotenv').config();

const fetch = require('node-fetch');

const app = require('express')();

app.get('/auth', async (req, res) => {
  const code = req.query.code;

  if (code) {
    // const code = '4/sAFk-RUcycJRCrS6gs1q3IOeUWNzkwrfuoSzG6wKyjYhmyb_Fs5npSq29-i0QjzwIVVbfuLw7z5XY4xa5EyLVOo';
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = 'http://localhost:3000/auth';
  
    const baseUrl = 'https://oauth2.googleapis.com/token';
  
    try {
      const response = await fetch(`${baseUrl}?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`, { method: 'POST' });
      // console.log(response.text());
      const json = await response.text();
      res.send(json);
      // res.json(JSON.parse(json).access_token);
    } catch (e) {
      console.error(e);
      throw e;
    }
  } else {
    res.send(req.url);
  }


});

app.get('/index', async (req, res) => {
  res.send(req.url);
});

app.get('/test', async (req, res) => {
  // const token = 'a29.Il-bB4ax4XeA_jFWiUBrwYcucISCo4COBlkvJNtGCsEkeSSghxRV1qBLCcaDCLQCwh3Gm8VFglYPxATYbNB7fdrKzt7_und-no2zrF0Cj6HzlXbdtX-ecUwFTMTuqN0GXw';
  const token = 'ya29.Il-bB2YjreokLWPIlQOAYjmNyOvJPruO6y7opcT0lsukYVZLa8Kg1Y_cESumO1rBULEN1BcJPkI6Sbk2i04JHPxBVqqQfFzDHtxKD9Mu64CU6T92ldzFrHXv6FgYp4MTuQ';

  /**
   * {
  "snippet": {
    "channelId": "UCvjgXvBlbQiydffZU7m1_aw",
    "topLevelComment": {
      "snippet": {
        "textOriginal": "Hello, world!",
        "videoId": "4uU9lZ-HSqA"
          }
        }
      }
    }
   */
  const body = {
    snippet: {
      channelId: 'UCvjgXvBlbQiydffZU7m1_aw',
      topLevelComment: {
        snippet: {
          videoId: '4uU9lZ-HSqA',
          textOriginal: 'Hello, world 2!'
        }
      }
    }
  };


  const response = await fetch('https://www.googleapis.com/youtube/v3/commentThreads?part=snippet', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  try {
    const json = await response.json();
    res.json(json);
  } catch (e) {
    console.error(e);
    throw e;
  }

});

app.get('/auth-callback', async (req, res) => {
  const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const clientId = process.env.CLIENT_ID;
  const redirectUri = 'http://localhost:3000/auth';
  const scope= 'https://www.googleapis.com/auth/youtube.force-ssl';
  const access_type = 'online';

  // const response = await fetch();
  res.redirect(`${baseUrl}?scope=${scope}&access_type=${access_type}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`);
});

app.listen('3000', () => {
  console.log('Listening at localhost:3000');
});