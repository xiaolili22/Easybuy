import { Button, message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { GetProducts, UpdateProductStatus } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import DescriptionCell from "../../components/DescriptionCell";

function Products() {
  const [products, setProducts] = React.useState([]);
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateProductStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => (
        <DescriptionCell description={record.description} />
      ),
    },

    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Condition",
      dataIndex: "condition",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Updated On",
      dataIndex: "updatedAt",
      render: (text, record) =>
        moment(record.updatedAt).format("DD/MM/YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "Pending" && (
              <span
                className="cursor-pointer"
                onClick={() => onStatusUpdate(_id, "Approved")}
              >
                Approve
              </span>
            )}
            {status === "Pending" && (
              <span
                className="cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "Rejected");
                }}
              >
                Reject
              </span>
            )}
            {status === "Approved" && (
              <span
                className="cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "Blocked");
                }}
              >
                Block
              </span>
            )}
            {status === "Blocked" && (
              <span
                className="cursor-pointer"
                onClick={() => {
                  onStatusUpdate(_id, "Approved");
                }}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={products} />
    </div>
  );
}

export default Products;
