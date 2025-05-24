import { Link } from "react-router";
import defaultImage from '~/assets/defaultImage.png';

const style = {
  productCardContainer: "overflow-hidden bg-white text-[#222] flex-col text-xs font-normal leading-4 flex justify-center relative p-3 rounded-xl",
  productImage: "flex justify-center overflow-hidden relative rounded-xl p-1 w-full h-full",
  cardInfoWrapper: "flex flex-col h-full justify-between",
  productDesc: "text-[15px] leading-[21px] max-w-[800px] line-clamp-2 text-ellipsis mb-3",
  productPrice: "text-[28px] font-bold leading-[38px] overflow-hidden text-ellipsis break-all mb-1",
};

interface ProductProps {
  id: string | number;
  imageUrl?: string;
  description: string;
  price: number | string;
  minimumOrderQuantity: number | string;
}

export default function CardProduct({
  product
}: {
  product: ProductProps
}) {
  const {
    id,
    imageUrl,
    description,
    price,
    minimumOrderQuantity
  } = product;

  return (
    <Link to={`/${id}`}>
      <div className={style.productCardContainer}>
        <div className='relative mb-3 w-48 h-48'>
          <img
            src={imageUrl || defaultImage}
            alt='product'
            className={style.productImage}
          />
        </div>
        <div className={style.cardInfoWrapper}>
          <p className={style.productDesc}>
            {description}
          </p>
          <h2 className={style.productPrice}>
            US${price}
          </h2>
          <p className={style.productDesc}>
            Min order: {minimumOrderQuantity} pieces
          </p>
        </div>
      </div>
    </Link>
  );
};
