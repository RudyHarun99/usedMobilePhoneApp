import defaultImage from '~/assets/defaultImage.png';
import type { ProductType } from '~/types';

const style = {
  mainContainer: "flex flex-row w-full mb-5 justify-center p-6 bg-white rounded-xl",
  detailContainer: "w-[1204px] h-[400px] gap-10 flex flex-col",
  detailInfo: "w-auto h-[536px] gap-6 flex",
  detailImageContainer: "w-[400px] h-[400px] overflow-hidden rounded-lg",
  detailContent: "w-[780px] h-[536px] gap-6 flex flex-col",
  detailName: "text-[#0A0D12] text-xl leading-[34px] font-semibold",
  detailPrice: "text-[#0A0D12] text-2xl leading-9 font-bold",
  detailDesc: "gap-2 text-[#0A0D12] px-0 py-6 border-y-[#D5D7DA] border-t border-solid border-b",
  descTitle: "text-lg leading-8 font-semibold mb-2",
  descContent: "w-[780px] text-[14px,li] leading-7 font-normal",
  detailFooter: "",
  detailQuantity: "flex flex-row gap-4 mb-6",
  minQuantity: "text-[#181D27] text-base leading-[30px] font-bold",
};

export default function CardDetail({
  product
}: {
  product: ProductType
}) {
  const {
    name,
    description,
    price,
    imageUrl,
    stockQuantity,
    minimumOrderQuantity,
  } = product;

  return (
    <div className={style.mainContainer}>
      <div className={style.detailContainer}>
        <div className={style.detailInfo}>
          <div className={style.detailImageContainer}>
            <img
              src={imageUrl || defaultImage}
              alt="product"
              className="w-full h-full"
            />
          </div>
          <div className={style.detailContent}>
            <div className="gap-1.5">
              <div className={style.detailName}>
                {name}
              </div>
              <div className={style.detailPrice}>
                US${price}
              </div>
            </div>
            <div className={style.detailDesc}>
              <p className={style.descTitle}>
                Description
              </p>
              <p className={style.descContent}>
                {description}
              </p>
            </div>
            <div className={style.detailFooter}>
              <div className={style.detailQuantity}>
                <p>Stock Quantity {stockQuantity}</p>
              </div>
              <div className={style.minQuantity}>
                Min oder: {minimumOrderQuantity} pieces
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
