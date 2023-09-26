import { storage } from '../configurations/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'

export const imageUpload = async (selectedFile, imageFolder) => {
  if (!selectedFile) {
    return
  }

  const imageRef = ref(storage, `${imageFolder}/${selectedFile.name + v4()}`)
  try {
    await uploadBytes(imageRef, selectedFile)

    const imageUrl = await getDownloadURL(imageRef)
    // push the imageUrl to the imageUrl array

    return imageUrl
  } catch (error) {
    console.log(error)
    return null
  }
}
export const removeImage = async (imageUrl) => {
  // Remove the image from Firebase Storage
  const imageRef = ref(storage, imageUrl)
  try {
    await deleteObject(imageRef)
  } catch (error) {
    console.log(error)
  }
}
