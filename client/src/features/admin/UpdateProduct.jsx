import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";

import ImageUpload from "./ImageUpload";
import Form from "../../ui/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, getProducts, updateProduct } from "./productSlice";
import useProductContext from "../../contexts/ProductsContext";
import { productFormElements } from "../../config/index";
import { toast } from "@/hooks/use-toast";

const initialState = {
  image: null,
  title: "",
  description: "",
  price: "",
  salePrice: "",
  totalStock: "",
  brand: "",
  category: "",
};

function UpdateProduct() {
  const { currUpdatedProdId } = useProductContext();
  const { isLoading, product } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const { openUpdateProductDialog, setOpenUpdateProductDialog } =
    useProductContext();

  const [updateProductData, setUpdateProductData] = useState(initialState);
  const [imageFile, setImageFile] = useState(product?.image || null);

  const submitHandler = () => {
    dispatch(updateProduct({ currUpdatedProdId, updateProductData }))
      .then((data) => {
        if (data.payload && data.payload.status) {
          dispatch(getProducts());
          setOpenUpdateProductDialog(false);
          setUpdateProductData(initialState);
          toast({
            title: "Product updated successfully!",
          });
        } else {
          toast({
            title: "Error occuried!",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {});
  };

  useEffect(
    function () {
      if (!currUpdatedProdId) return;
      dispatch(getProduct(currUpdatedProdId));
    },
    [currUpdatedProdId, dispatch]
  );

  useEffect(
    function () {
      setUpdateProductData({ ...product });
    },
    [product]
  );

  return (
    <>
      <Sheet
        open={openUpdateProductDialog}
        onOpenChange={setOpenUpdateProductDialog}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="mb-5">
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          {/* <ImageUpload
            file={imageFile}
            setFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setIsImageLoadin={setIsImageLoadin}
            isImageLoading={isImageLoading}
          /> */}
          <div className="py-6">
            {isLoading ? (
              <div>Loading</div>
            ) : (
              <Form
                formControls={productFormElements}
                formData={updateProductData}
                setFormData={setUpdateProductData}
                onSubmit={submitHandler}
                buttonText={
                  isLoading || isLoading ? "Loading" : "Update Product"
                }
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default UpdateProduct;
