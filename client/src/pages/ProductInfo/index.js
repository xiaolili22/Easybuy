import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllBids,
  GetProductById,
  GetProducts,
} from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { Button, message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";
import BidModal from "./BidModal";

function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <div>
        <div className="grid grid-cols-2 gap-5 mt-5 px-6">
          {/* images */}
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 object-cover rounded-md"
            />

            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer" +
                      (selectedImageIndex === index
                        ? "border-2 border-solid border-red-300 p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>
          </div>

          {/* details */}
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h1>
              <div className="mt-2">
                <span>{product.description} </span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-gray-800">
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>$ {product.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Condition</span>
                <span>{product.condition}</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-gray-800">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
            </div>

            <Divider />
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800">
                  Interested?
                </h1>
                <Button
                  className="rounded-md"
                  onClick={() => setShowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id}
                >
                  Bid It
                </Button>
              </div>
            </div>
          </div>
        </div>
        {showAddNewBid && (
          <BidModal
            product={product}
            getData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
          />
        )}
      </div>
    )
  );
}

export default ProductInfo;
