import React, { useEffect, useState } from "react";
import "./MasterManagement.css";
import axios from "@/Config/axios";
import { toast } from "react-toastify";

function MasterManagement() {

  /* =========================
     STATES
  ========================= */

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [taxName, setTaxName] = useState("");
  const [taxValue, setTaxValue] = useState("");
  const [discountName, setDiscountName] = useState("");
  const [discountValue, setDiscountValue] = useState("");

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [taxes, setTaxes] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  /* =========================
     FETCH ALL
  ========================= */

  const fetchData = async () => {

    try {

      const [
        brandRes,
        categoryRes,
        taxRes,
        discountRes
      ] = await Promise.all([

        axios.get("/fetch-brand"),
        axios.get("/fetch-category"),
        axios.get("/fetch-tax"),
        axios.get("/fetch-discount")

      ]);

      setBrands(brandRes.data.data || []);

      setCategories(categoryRes.data.data || []);
      setTaxes(taxRes.data.data || []);
      setDiscounts(discountRes.data.data || []);

    } catch (error) {

      toast.error(error.message);

    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  /* =========================
     ADD BRAND
  ========================= */

  const addBrand = async () => {

    if (!brand) {
      return toast.warning("Enter Brand");
    }

    try {

      const { data } = await axios.post(
        "/addBrand",
        { brand }
      );

      if (data.success) {

        toast.success("Brand Added");

        setBrand("");

        fetchData();

      }

    } catch (error) {

      toast.error(error.message);

    }
  };

  /* =========================
     ADD CATEGORY
  ========================= */

  const addCategory = async () => {

    if (!category) {
      return toast.warning("Enter Category");
    }

    try {

      const { data } = await axios.post(
        "/addCategory",
        { category }
      );

      if (data.success) {

        toast.success("Category Added");

        setCategory("");

        fetchData();

      }

    } catch (error) {

      toast.error(error.message);

    }
  };

  /* =========================
     ADD TAX
  ========================= */

  const addTax = async () => {

    if (!taxName || !taxValue) {
      return toast.warning("Fill Tax Details");
    }

    try {

      const { data } = await axios.post(
        "/addTax",
        {
          taxName,
          taxValue
        }
      );

      if (data.success) {

        toast.success("Tax Added");

        setTaxName("");
        setTaxValue("");

        fetchData();

      }

    } catch (error) {

      toast.error(error.message);

    }
  };

  /* =========================
     ADD DISCOUNT
  ========================= */

  const addDiscount = async () => {

    if (!discountName || !discountValue) {
      return toast.warning("Fill Discount Details");
    }

    try {

      const { data } = await axios.post(
        "/addDiscount",
        {
          discountName,
          discountValue
        }
      );

      if (data.success) {

        toast.success("Discount Added");

        setDiscountName("");
        setDiscountValue("");

        fetchData();

      }

    } catch (error) {

      toast.error(error.message);

    }
  };

  return (

    <div className="master-page">

      {/* ================= BRAND ================= */}

      <div className="master-card">

        <h2>Brand Management</h2>

        <div className="master-form">

          <input
            type="text"
            placeholder="Enter Brand"
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
          />

          <button onClick={addBrand}>
            Add Brand
          </button>

        </div>

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Brand</th>
            </tr>
          </thead>

          <tbody>

            {brands.map((item, index) => (

              <tr key={item._id}>

                <td>{index + 1}</td>

                <td>{item.BrandName}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ================= CATEGORY ================= */}

      <div className="master-card">

        <h2>Category Management</h2>

        <div className="master-form">

          <input
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <button onClick={addCategory}>
            Add Category
          </button>

        </div>

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Category</th>
            </tr>
          </thead>

          <tbody>

            {categories.map((item, index) => (

              <tr key={item._id}>

                <td>{index + 1}</td>

                <td>{item.categoryName}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ================= TAX ================= */}

      <div className="master-card">

        <h2>Tax Management</h2>

        <div className="master-form">

          <input
            type="text"
            placeholder="Tax Name"
            value={taxName}
            onChange={(e) =>
              setTaxName(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Tax %"
            value={taxValue}
            onChange={(e) =>
              setTaxValue(e.target.value)
            }
          />

          <button onClick={addTax}>
            Add Tax
          </button>

        </div>

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Tax Name</th>
              <th>Percentage</th>
            </tr>
          </thead>

          <tbody>

            {taxes.map((item, index) => (

              <tr key={item._id}>

                <td>{index + 1}</td>

                <td>{item.taxName}</td>

                <td>{item.taxValue}%</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ================= DISCOUNT ================= */}

      <div className="master-card">

        <h2>Discount Management</h2>

        <div className="master-form">

          <input
            type="text"
            placeholder="Discount Name"
            value={discountName}
            onChange={(e) =>
              setDiscountName(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Discount %"
            value={discountValue}
            onChange={(e) =>
              setDiscountValue(e.target.value)
            }
          />

          <button onClick={addDiscount}>
            Add Discount
          </button>

        </div>

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Discount</th>
              <th>Percentage</th>
            </tr>
          </thead>

          <tbody>

            {discounts.map((item, index) => (

              <tr key={item._id}>

                <td>{index + 1}</td>

                <td>{item.discountName}</td>

                <td>{item.discountValue}%</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MasterManagement;