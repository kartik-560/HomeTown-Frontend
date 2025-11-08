import { button } from "framer-motion/client"
import { CldUploadWidget } from "next-cloudinary"

const UploadImages = () => {
  return (
    <CldUploadWidget uploadPreset="Images">
        {(open) =>(
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => open.showUploadWidget()}>Upload</button>
        ) }
    </CldUploadWidget>
  )
}

export default UploadImages