"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Product } from "@/payload-types";
import { useCart } from "@/hooks/use-cart";
const AddToCartButton = ({product}: {product: Product}) => {
  const { addItem } = useCart();
  const [IsSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [IsSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product)
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full"
    >
      {IsSuccess ? "Added" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
