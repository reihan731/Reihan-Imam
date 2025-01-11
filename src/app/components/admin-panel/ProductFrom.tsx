"use client";

import { useState, FormEvent } from "react";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import { UploadFileResponse } from "uploadthing/client";

interface IPayload {
  imgSrc: string;
  fileKey: string;
  name: string;
  category: string;
  price: string;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    imgSrc: "/placeholder.jpg",
    fileKey: "",
    name: "",
    category: "",
    price: ""
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!payload.name || !payload.category || !payload.price || payload.imgSrc === "/placeholder.jpg") {
      makeToast("Please fill in all required fields and upload an image.");
      return;
    }

    dispatch(setLoading(true));
    
    try {
      await axios.post("/api/add_product", payload);
      makeToast("Product added successfully");
      setPayload({
        imgSrc: "/placeholder.jpg",
        fileKey: "",
        name: "",
        category: "",
        price: ""
      });
    } catch (err) {
      console.error("Error adding product:", err);
      makeToast("Failed to add product. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image 
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payload.imgSrc}
        width={800}
        height={500}
        alt="Product image"
      />
      
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res: UploadFileResponse[] | undefined) => {
          if (res && res[0]) {
            setPayload(prev => ({
              ...prev,
              imgSrc: res[0].url,
              fileKey: res[0].key,
            }));
            makeToast("Image uploaded successfully");
          }
        }}
        onUploadError={(error: Error) => {
          console.error(`Upload error: ${error.message}`);
          makeToast("Failed to upload image. Please try again.");
        }}
      />

      {["name", "category", "price"].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block ml-1 capitalize">
            Product {field}
          </label>
          <input 
            id={field}
            name={field}
            className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
            type={field === "price" ? "number" : "text"}
            value={payload[field as keyof IPayload]}
            onChange={handleInputChange}
            required
          />
        </div>
      ))}

      <div className="flex justify-end">
        <button 
          type="submit" 
          className="bg-pink text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

