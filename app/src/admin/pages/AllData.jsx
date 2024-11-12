import React from "react";
import { Container } from "react-bootstrap";
import BarChart from "../../componenets/BarChart";

const AllData = ({ products }) => {
  const title = products.map((product) => product.title);
  const sold = products.map((product) => product.sold);

  return (
    <Container>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Products Sold</h3>
      <BarChart sold={sold} title={title} />
    </Container>
  );
};

export default AllData;

