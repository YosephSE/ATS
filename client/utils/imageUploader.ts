import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import { v4 as uuidv4 } from "uuid";

const uploadImage = async (file: any) => {
  if (!file) return;

  const uniqueName = `${uuidv4()}${file.name.substring(
    file.name.lastIndexOf(".")
  )}`;
  const storageRef = ref(storage, `images/${uniqueName}`);
  const snapshot = await uploadBytes(storageRef, file);
  const image = await getDownloadURL(snapshot.ref);
  console.log("Image uploaded successfully");
  console.log(image);
  return image;
};

export default uploadImage;
