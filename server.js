const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const url = require('url');
const queryString = require('querystring');
const wtf = require('wtf_wikipedia');
const fetch = require('node-fetch');
// const markdownRouter = require('express-markdown-router');
// const cloudinary = require('cloudinary');
// const aws = require('aws-sdk');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(markdownRouter(__dirname + '/pages'));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Something was sent back' });
});

app.get('/api', async (req, res) => {
  const search = req.query.search;

  const response = await fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${search}&limit=3`);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }

  const descriptionPromises = [];

  body[1].forEach((title, index) => {
    descriptionPromises.push(new Promise(async (resolve, reject) => {
      try {
        resolve(await wtf.fetch(title).then((doc) => doc.sentences(0).text()));
      } catch (exception) {
        reject(exception);
      }
    }));
  });

  Promise.all(descriptionPromises).then((descriptions) => {
    const shirts = body[1].map((title, index) => ({
      name: `${title}`,
      description: descriptions[index],
    }));

    res.send(shirts);
  });
});

const CHARACTER_LIMIT = 500;

app.get('/api/single', async (req, res) => {
  const title = req.query.title;

  const response = await wtf.fetch(title)
    .then((doc) => {
      const sentences = doc.sentences().map(({ data: { text } }) => text);

      let reachedLimit = false;
      let text = '';

      for (let i = 0; i < sentences.length; i++) {
        const proposedText = text + ' ' + sentences[i];

        if (proposedText.length <= CHARACTER_LIMIT && !reachedLimit) {
          text = proposedText.replace(/  +/g, ' ').trim();
        } else {
          reachedLimit = true;
        }
      }

      res.send({
        name: doc.options.title,
        content: doc.data.sections[0].html(),
        text,
        links: doc.data.sections[0].links().map(({ page }) => page),
        pageId: doc.options.pageID,
      });
    })
    .catch((exception) => {
      console.log('Critical error, could\'t view the freaking shirt.');
    });
});

// aws.config.update({
//   region: 'ap-southeast-2',
//   accessKeyId: process.env.AWSAccessKeyId,
//   secretAccessKey: process.env.AWSSecretKey,
// });
//
// const S3_BUCKET = process.env.bucket;

const stripeSecretKey = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY_LIVE : process.env.SECRET_KEY_TEST;

// TODO: ENSURE THIS IS SET TO PRODUCTION WHEN RELEVANT
var stripe = require('stripe')(stripeSecretKey);

app.post('/api/create-and-pay-for-order', async (req, res) => {
  console.log('CREATE-ORDER', req.body);

  stripe.orders.create(req.body.order, (error, order) => {
    if (error) {
      res.send({ error });
    } else {
      stripe.orders.pay(order.id, {
        source: req.body.source.id,
      }, (error, order) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({ order })
        }
      });
    }
  });
});

// app.post('/api/upload-image', (req, res) => {
//   console.log('CALLING /api/upload-image');
//   //
//   // const s3 = new aws.s3();
//   // const fileName = req.body.fileName;
//   // const fileType = req.body.fileType;
//   //
//   // console.log(fileName, fileType);
//   //
//   // const s3Params = {
//   //   Bucket: S3_BUCKET,
//   //   Key: fileName,
//   //   Expires: 500,
//   //   ContentType: fileType,
//   //   ACL: 'public-read',
//   // };
//   //
//   // s3.getSignedUrl('putObject', s3Params, (err, data) => {
//   //   if (err) {
//   //     console.log(err);
//   //     res.json({ success: false, error: err });
//   //   }
//   //
//   //   const returnedData = {
//   //     signedRequest: data,
//   //     url: `http://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
//   //   };
//   //
//   //   res.json({ success: true, data: { returnData } });
//   // });
// });

// // TODO: Use environmental variables here instead
// cloudinary.config({
//   cloud_name: 'dnjad71gj',
//   api_key: '156217141384419',
//   api_secret: 'K4P__gEcxV7ZyBq_ECiVphpF_wo',
// });
//
// app.post('/api/upload-image', async (req, res) => {
//   console.log('api/upload-image', req.body);
//
//   const currentDate = moment().format('MMM YYYY');
//   console.log(currentDate);
//
//   cloudinary.v2.uploader.upload(`${req.body.name} ${currentDate}`, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.send({ error });
//     } else {
//       console.log(result);
//       res.send({ result });
//     }
//   });
// });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle react routing, return all requests to the React client-side app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listing on port: ${port}`));
