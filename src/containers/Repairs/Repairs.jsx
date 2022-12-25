import { useState, useEffect } from "react";
import "./Repairs.css";
import Form from "react-bootstrap/Form";
import { getBrands } from "../../services/apiCalls";

function Repairs() {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (brands.length === 0) {
      getBrands()
        .then((res) => {
          console.log(res.data.data);
          setBrands(res.data.data);
        })
        .catch((error) => {
          return;
        });
    }
    brands.map((brand) => {
      console.log(brand.brand);
    });
  });

  return (
    <div className="container-repairs">
      <div>
        <div>Select your device brand</div>
        <Form.Select aria-label="Default select example">
        <option>Select your branch</option>
          {brands.map((brand) => {
            return <option value={brand.brand}>{brand.brand}</option>;
          })}

          {/* <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option> */}
        </Form.Select>
        <Form.Select aria-label="Default select example">
        <option>Select your device</option>
          {brands.map((brand) => {
            return <option value={brand.brand}>{brand.brand}</option>;
          })}

          {/* <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option> */}
        </Form.Select>
      </div>
    </div>
  );
}

export default Repairs;