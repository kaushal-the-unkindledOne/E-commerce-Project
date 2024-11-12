import { Badge, Container, Form, Pagination, Row } from "react-bootstrap";
import { ProductData } from "../context/ProductContext";
import ProductCard from "../componenets/ProductCard";
import Loader from "../componenets/Loader";

const Products = () => {
  const {
    products,
    loading,
    categories,
    search,
    setSearch,
    category,
    setCategory,
    price,
    totalPages,
    setPrice,
    page,
    setPage,
  } = ProductData();
  return (
    <Container className="mt-4">
      <h4>
        Our Products <Badge bg="secondary">All Products</Badge>{" "}
      </h4>

      <div
        className="filter"
        style={{
          width: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <h2>Filters</h2>
        <Form.Control
          type="text"
          placeholder="Search"
          style={{ width: "250px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Form.Select
          aria-label="Default Select example"
          className="mt-3"
          style={{ width: "250px" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          {categories &&
            categories.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
        </Form.Select>

        <div className="range">
          <Form.Range
            className="mt-3"
            style={{ width: "2oopx" }}
            min={0}
            max={7000}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p>Minimum Price -₹ {price}</p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Row className="justify-content-center" style={{ gap: "1rem" }}>
          {products && products.length > 0 ? (
            products.map((e) => <ProductCard key={e._id} product={e} />)
          ) : (
            <p>No Products Yet</p>
          )}
        </Row>
      )}

      {
        totalPages && totalPages> 1 && (
          <div style={{
            display: "flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems:"center",
            marginTop: "8px",
          }}
          >
            <Pagination>
              {[...Array(totalPages)].map((_,i) =>(
                <Pagination.Item key={i} onClick={() => setPage(i+1)} style={{cursor:"pointer"}}>{i+1}</Pagination.Item>
              ))}
              </Pagination> 

          </div>
          
        )



      }

    </Container>
  );
};

export default Products;
