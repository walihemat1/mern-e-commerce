import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

function ImageUpload({
  file,
  setFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setIsImageLoadin,
  isImageLoading,
}) {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleRemoveImage = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  async function cloudinaryImageUploadHandler() {
    try {
      setIsImageLoadin(true);
      const formData = new FormData();
      formData.append("my_file", file);
      const res = await axios.post(
        "http://localhost:5000/api/admin/product/upload-image",
        formData,
        { withCredentials: true }
      );

      if (res) setUploadedImageUrl(res.data.data.url);
      setIsImageLoadin(false);
    } catch (error) {
      console.log(error);
      setIsImageLoadin(false);
    }
  }

  useEffect(
    function () {
      if (file !== null) cloudinaryImageUploadHandler();
    },
    [file]
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef.current}
          onChange={handleImageFileChange}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload an image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-ceter">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>

            <p className="text-sm font-medium">
              {isImageLoading ? "Loading" : file.name}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
