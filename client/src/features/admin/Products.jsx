import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { addProductsFromElements } from "@/config";
import Form from "@/ui/Form";
import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProducts } from "./productSlice";
import AllProduct from "./ProductsList";
import { toast } from "@/hooks/use-toast";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function Products() {
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [addProductData, setAddProductData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [isImageLoading, setIsImageLoadin] = useState(false);
  const [currUpdatedProdId, setCurrUpdatedProdId] = useState(null);

  const { isLoading } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(addProduct(addProductData)).unwrap();

    if (res?.status) {
      dispatch(getProducts());
      setAddProductData(initialState);
      setImageFile(null);
      toast({
        title: res.message || "Product created!",
      });
      setOpenAddProductDialog(false);
    } else {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  useEffect(
    function () {
      if (uploadedImageUrl)
        setAddProductData({ ...addProductData, image: uploadedImageUrl });
    },

    [uploadedImageUrl]
  );

  return (
    <>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenAddProductDialog(true)}>
          Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <AllProduct setCurrUpdatedProdId={setCurrUpdatedProdId} />
      </div>

      <Sheet open={openAddProductDialog} onOpenChange={setOpenAddProductDialog}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="mb-5">
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ImageUpload
            file={imageFile}
            setFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setIsImageLoadin={setIsImageLoadin}
            isImageLoading={isImageLoading}
          />
          <div className="py-6">
            <Form
              formControls={addProductsFromElements}
              formData={addProductData}
              setFormData={setAddProductData}
              onSubmit={submitHandler}
              buttonText={
                isImageLoading || isLoading ? "Loading" : "Add Product"
              }
              disabled={isImageLoading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Products;
