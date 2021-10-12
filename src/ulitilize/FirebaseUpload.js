import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyCU6n8wGTrbrmeUWfQgnhO9yJQnGrPUSeU",
  authDomain: "techshop-2ee9d.firebaseapp.com",
  projectId: "techshop-2ee9d",
  storageBucket: "techshop-2ee9d.appspot.com",
  messagingSenderId: "363474458368",
  appId: "1:363474458368:web:94a1644b6ecc4810d2c5e5",
  measurementId: "G-LJJ6P02KQD"
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase)



const firebaseUpload = (files) =>{
  const promises = [];
  files.forEach((file) =>{
    const metadata = {
      contentType: 'image/jpeg'
    };

    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    promises.push(uploadTask)
    uploadTask.on('state_changed',
      (snapshot) => {}, 
      (error) => {
        alert('Could\'t upload file')
      }, 
      () =>  {
        // Upload completed successfully, now we can get the download URL
       
      }
    );
  
  
  })
  return Promise.all(promises);
}
export default firebaseUpload;