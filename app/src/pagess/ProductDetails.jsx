import { Col, Container, Row, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../main";
import { useParams } from "react-router-dom";
import { CartData } from "../context/CartContext";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [stock, setStock] = useState("");

  const params = useParams();
  const { addToCart } = CartData();
  const { isAuth, user } = UserData();

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${server}/api/product/${params.id}`);
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product: ", error);
    }
  }

  async function updateStock() {
    try {
      const { data } = await axios.put(
        `${server}/api/product/${params.id}`,
        { stock },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchProduct();
      setStock("");
    } catch (error) {
      toast.error(error.message.data.message);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCartHandler = async (product) => {
    await addToCart(product);
  };

  return (
    <Container className="mt-4">
      {product && (
        <Row className="mt-5">
          <Col md={6}>
            <Image src={`${server}/${product.image}`} alt="" fluid />
          </Col>
          <Col md={6}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ₹{product.price}</p>
            {user.role === "admin" && <p>Stock: {product.stock}</p>}
            {user.role === "admin" && (
              <>
                <input
                  type="number"
                  placeholder="update Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
                <Button className="mx-2" onClick={updateStock}>
                  Update Stock
                </Button>
              </>
            )}{" "}
            <br />
            {product.stock === 0 ? (
              <p className="text-danger">Out of Stock</p>
            ) : (
              <>
                {isAuth ? (
                  <Button
                    onClick={() => addToCartHandler(product._id)}
                    variant="secondary"
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <p className="text-danger">
                    Please Login to add this Product in your Cart.
                  </p>
                )}
              </>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetails;
