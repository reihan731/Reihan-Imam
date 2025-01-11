import ProductFrom from "@/app/components/admin-panel/ProductFrom";

import React from "react";

const Products = () => {
  return (
    <div className="h-calc[100vh-96px] w-full grid place-items-center overflow-y-auto">
      <div className="bg-white w-[300px] rounded-lg p-4">
        <ProductFrom />
      </div>
    </div>
  );
};

export default Products;