// 1. Required Modules को इम्पोर्ट करें
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middleware सेटअप
app.use(cors()); // Frontend (GitHub Pages) से रिक्वेस्ट अलाउ करने के लिए
app.use(express.json()); // JSON डेटा रीड करने के लिए

// 3. Firebase Admin SDK को इनिशियलाइज करें
// ध्यान रखें: 'serviceAccountKey.json' फाइल इसी फोल्डर में होनी चाहिए
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com" // अपने Firebase DB का URL यहाँ डालें (अगर Realtime DB है)
});

const db = admin.firestore(); // अगर Firestore यूज़ कर रहे हैं तो

// 4. एक सिंपल टेस्ट रूट (Route)
app.get('/', (req, res) => {
  res.send('Server एकदम मस्त चल रहा है भाई!');
});

// 5. डेटा रिसीव करने और Firebase में सेव करने का API Route
app.post('/api/update-data', async (req, res) => {
  try {
    const incomingData = req.body;

    // Firebase Firestore में 'users' कलेक्शन में डेटा सेव करना
    const res2 = await db.collection('web_data').add({
      data: incomingData,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).send({ success: true, message: "Data Firebase mein save ho gaya!", id: res2.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// 6. सर्वर स्टार्ट करें
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

