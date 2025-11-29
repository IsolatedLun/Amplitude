# Welcome to Amplitude
A simple music app made with expo + react native.

## Get started

1. Install dependencies:
   Run `_init.bat`;

2. Start app + server:
   Run `_run.bat`

OR

1. `[open cmd in root folder] => npm install && cd server && npm install && cd .. && npm run start`
2. `[open cmd in root/server folder] => npm run dev`

- [How to setup your own S3 bucket](https://www.youtube.com/watch?v=eQAIojcArRY)

***server => .env***
```
ACCESS_KEY=...
SECRET_ACCESS_KEY=...

BUCKET_NAME=...
BUCKET_REGION=...
SONG_IMAGE_FOLDER_PATH=...
SONG_AUDIO_FOLDER_PATH=...

MONGO_URI=...
LOCAL_IP=...
PORT=...
```

***.env***
```
LOCAL_IP=...
PORT=...
```

### Technologies used
- React native + expo (frontend)
- MongoDB (database)
- AWS S3 (file storage)
=> AMERN or MERNA stack (invented by me)

### Why I used these technologies
- React native + expo is an obvious one
- I've never used mongoDB before and thought it would cool to make a project with it
- Since mongoDB is document based and has limitations storing files (it took 30s to receive ±2mb files stored in binary), and while I could've used the GridFS api provided by them. I decided to use and learn AWS S3 + it's a really valuabe skill

### Features
- Auth (WIP)
- View + play song
- Create/edit song
- Settings + edit profile
- Light/Dark mode *(works but light mode is disabled)*

#### Most Notable Packages Used:
- [UUID](https://www.npmjs.com/package/react-native-uuid) (for generating rand ids + tokens)
- [Sharp](https://www.npmjs.com/package/sharp) (image processing)
- [Axios](https://www.npmjs.com/package/axios)
- [AWS S3](https://www.npmjs.com/package/@aws-sdk/client-s3)
- [MongoDB](https://www.npmjs.com/package/mongodb)
- [SecureStore](https://www.npmjs.com/package/expo-secure-store)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [Reanimated](https://www.npmjs.com/package/react-native-reanimated)
- [ImagePicker](https://www.npmjs.com/package/expo-image-picker)
- [DocumentPicker](https://www.npmjs.com/package/expo-document-picker)
- [Expo Audio](https://www.npmjs.com/package/expo-audio)
- [Formik](https://formik.org/)
- [Slider](https://docs.expo.dev/versions/latest/sdk/slider/)
- [Yup](https://www.npmjs.com/package/yup)

##### Known issues
- Due to the way expo handles local files, I cant get the file info during editing, so I cant provide the input with the file name and size (thats why i just show `Change [Image/Audio] File`).
- Expo audio is sometimes glitchy with `loop`, `isPlaying`, `volume` states.
- Light theme is ugly, need to play around with colors.
- Some minor (hopefully) bugs may introduce themselves due to me not testing individual components.