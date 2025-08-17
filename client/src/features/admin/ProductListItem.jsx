import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function ProductListItem({ product }) {
  const { image, title, description, price, salePrice } = product;
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
      </div>

      <CardContent>
        <h2 className="text-xl font-bold mt-2">{title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            ${price}
          </span>
          {salePrice > 0 ? (
            <span className="text-lg font-bold">${salePrice}</span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default ProductListItem;
