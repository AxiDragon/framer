import { useEffect, useState } from "react";
import ImageEditor from "./ImageEditor"
import ImageInput from "./ImageInput";

function App() {
  const defaultImage = import.meta.env.VITE_DEFAULT_IMAGE || "";
  const [image, setImage] = useState<string>(defaultImage);

  useEffect(() => {
    const onReturn = () => {
      setImage("");
    }

    window.addEventListener("return", onReturn);

    return () => {
      window.removeEventListener("return", onReturn);
    }
  }, []);

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
