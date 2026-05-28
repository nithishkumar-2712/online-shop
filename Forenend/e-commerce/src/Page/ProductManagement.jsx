import { useEffect, useState } from "react";
import"./ProductManagement.css" ;
import { toast } from "react-toastify";
  import {useForm} from "react-hook-form";
import Customhook from "@/components/Customhook";
import axios from "@/Config/axios";
const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [files, setFiles] = useState([]);
  const [products, setproducts] = useState([]);
  const [page, setpage] = useState(1);
  const [total, settotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const{Data:categories}=Customhook("/fetch-category");
  const{Data:Tax }=Customhook("/fetch-tax");
  const{Data:brand }=Customhook("/fetch-brand");
  const{Data:discount }=Customhook("/fetch-discount");
  // const{Data:products,CustomHook }=Customhook(`/Adminproduct/${page}`);
  const [showForm, setShowForm] = useState(false);
  const totalPages = Math.ceil(total /10);
  console.log(`5totalproduect${total}`)
  console.log(`totalpage${totalPages}`)
  const { register, handleSubmit,reset } = useForm();
  const [file, Setfile] = useState(null);
  const [filename, Setfilename] = useState("");
const Adminproduect = async () => {
  setLoading(true);   // 🔥 start loading

  try {
    const { data } = await axios.get(`/Adminproduct/${page}`);

    if (data.success) {
      setproducts(data.data);
      settotal(data.total);
      toast.success(data.message);
    } else {
      toast.warning(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }

  setLoading(false);  // 🔥 stop loading
};
  useEffect(()=>{
    Adminproduect();
  },[page])
const Savefile = (e) => {
  const selectedFiles = Array.from(e.target.files);

  if (selectedFiles.length > 0) {
    setFiles(selectedFiles);
  }
};
    // const Handleupdata = (item) => {
    //   setShowForm(true);
    //   setEditId(item._id);

    //   // fill form values
    //   reset({
    //     productname: item.productname,
    //     price: item.price,
    //     SellingCost: item.sellingCost,
    //     category: item.category,
    //     discount: item.discount,
    //     Tax: item.Tax,
    //     Stock: item.Stock,
    //     seller: item.seller,
    //     Brand: item.Brand,
    //     about: item.about,
    //   });

    //   // optional image
    //   Setfilename(item.filename || "");
    // };
const onSubmit = async (items) => {
  try {
    const formdata = new FormData();

    // multiple files append
    files.forEach((file) => {
      formdata.append("file", file);
    });

    formdata.append("productname", items.productname);
    formdata.append("PurchasingRate", items.PurchasingRate);
    formdata.append("Mrp", items.Mrp);
    formdata.append("Stock", items.Stock);
    formdata.append("sellingCost", items.SellingCost);
    formdata.append("category", items.category);
    formdata.append("discount", items.discount);
    formdata.append("about", items.about);
    formdata.append("Tax", items.Tax);
    formdata.append("Brand", items.Brand);
    formdata.append("seller", items.seller);

    const { data } = await axios.post("/Produect", formdata);

    if (data.success) {
      toast.success(data.message);
      reset();
      setFiles([]);
      setShowForm(false);
    } else {
      toast.warning(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};
const DeleteItems = async(id) => {

  try {

    const { data } = await axios.put(`/Deleteitems/${id}`);

    if (data.success) {
      toast.success(data.message);
      Adminproduect();
    } else {
      toast.warning(data.message);
    }

  } catch (error) {

    toast.error(error.message);

  }

}
 /* ================= LOADING UI (PREMIUM) ================= */
  if (loading) {
    return (
      <div className="admin-skeleton-page">

        <div className="sk-header"></div>

        <div className="sk-table">
          {[...Array(6)].map((_, i) => (
            <div className="sk-row" key={i}>
              <div className="sk-cell w-10"></div>
              <div className="sk-cell w-20"></div>
              <div className="sk-cell w-20"></div>
              <div className="sk-cell w-15"></div>
              <div className="sk-cell w-15"></div>
              <div className="sk-cell w-15"></div>
            </div>
          ))}
        </div>

      </div>
    );
  }


  return (
    <div className="product-page">

      <div className="product-header">
        <h2>Products</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          + Add Product
        </button>
      </div>

      {/* ✅ FORM */}
        {showForm && (
          <div className="modal-overlayy">
            <div className="modal-boxx">

              <div className="modal-headerr">
                <h3>{editId ? "Update Product" : "Add Product"}</h3>
                <button  className="close"onClick={() => setShowForm(false)}>✖</button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-grid">

                  {/* Product Name */}
                  <div className="form-group">
                    <label>Product Name</label>
                    <input {...register("productname")} />
                  </div>

                  {/* Price */}
                  <div className="form-group">
                    <label>Purchasing Rate</label>
                    <input type="number" {...register("PurchasingRate")} />
                  </div>
                  {/* Price */}
                  <div className="form-group">
                    <label>Mrp:</label>
                    <input type="number" {...register("Mrp")} />
                  </div>

                  {/* Selling Cost */}
                  <div className="form-group">
                    <label>Selling Cost </label>
                    <input type="number" {...register("SellingCost")} />
                  </div>

                 {/* Stock */}
                  <div className="form-group">
                    <label>Stock</label>
                    <input type="number" {...register("Stock")} />
                  </div>

                  {/* Seller */}
                  <div className="form-group">
                    <label>Seller</label>
                    <input {...register("seller")} />
                  </div>

                  {/* Category */}
                  <div className="form-group">
                    <label>Category</label>
                    <select {...register("category")}>
                      <option>Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Discount */}
                  <div className="form-group">
                    <label>Discount</label>
                    <select {...register("discount")}>
                      <option>Select Discount</option>
                      {discount.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.discountValue}%
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tax */}
                  <div className="form-group">
                    <label>Tax</label>
                    <select {...register("Tax")}>
                      <option>Select Tax</option>
                      {Tax.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.taxValue}%
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image */}
                  <div className="form-group">
                    <label>Upload Image</label>
                    {/* <input type="file" multiple accept="image/*"   onChange={Savefile} /> */}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={Savefile}
                      />
                  </div>

                  {/* Brand */}
                  <div className="form-group">
                    <label>Brand</label>
                    <select {...register("Brand")}>
                      <option>Select Brand</option>
                      {brand.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.BrandName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* About */}
                  <div className="form-group full">
                    <label>Description</label>
                    <textarea {...register("about")} />
                  </div>

                </div>
                <button type="submit" className="submit-btn">
                  {editId ? "Update Product" : "Save Product"}
                </button>
              </form>

            </div>
          </div>
        )}
      {/* TABLE (your existing code) */}
      <table className="product-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Mrp</th>
            <th>PurchasingRate</th>
            <th>sellingCost</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((items,index)=>(
          <tr key={index+1}>
            <td>{index+1}</td>
            <td><img src={items.file[0]} className="product-img" /></td>
            <td>{items.productname}</td>
            <td>{items.Mrp}</td>
            <td>{items.PurchasingRate}</td>
            <td>{items.sellingCost}</td>
            <td><span className="in-stock">{items.Stock}</span></td>
            <td style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                className="view-btnn"
                onClick={() => {
                  setSelectedProduct(items);   // 🔥 full object save
                  setShowModal(true);
                }}
              >
                View
              </button>

              <button
                className="delete-btnn"
                onClick={() => DeleteItems(items._id)}
              >
                {items.check ? "Delete" : "Restore"}
              </button>
              <button
                className="update-btnn"
                onClick={() => Handleupdata(items)}
              >
                Update
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setpage(index + 1)}
            className={`page-btn ${page === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="product-modal">

            <div className="modal-header">
              <h3>Product Details</h3>
              <button className="close" onClick={() => setShowModal(false)}>✖</button>
            </div>

            <div className="modal-body">

              <p><b>Product Name:</b> {selectedProduct?.productname}</p>
              <p><b>Mrp:</b> {selectedProduct?.Mrp}</p>
              <p><b>PurchasingRate:</b> {selectedProduct?.PurchasingRate}</p>
              <p><b>Selling Cost:</b> {selectedProduct?.sellingCost}</p>
              <p><b>Stock:</b> {selectedProduct?.Stock}</p>

              <p><b>Category:</b> {selectedProduct?.category?.categoryName || selectedProduct?.category}</p>

              <p><b>Brand:</b> {selectedProduct?.Brand?.BrandName || selectedProduct?.Brand}</p>

              <p><b>Tax:</b> {selectedProduct?.Tax?.taxValue || selectedProduct?.Tax}</p>

              <p><b>Discount:</b> {selectedProduct?.discount?.discountValue || selectedProduct?.discount}</p>

              <p><b>Seller:</b> {selectedProduct?.seller}</p>

            </div>

          </div>
        </div>
      )}
    </div>

  );
};

export default ProductPage;