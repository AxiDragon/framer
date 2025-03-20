import { useState } from "react";
import ImageEditor from "./ImageEditor"
import ImageInput from "./ImageInput";

function App() {
  const [image, setImage] = useState<string>("");

  // Stickers
  // Main Image
  // Filters
  // Frames
  // Download
  return (
    <div className="App">
      {
        image !== "" ?
          <ImageEditor image={image} /> :
          <ImageInput onImageAccepted={(img: string) => { setImage(img) }} />
      }
    </div>
  )
}

export default App
