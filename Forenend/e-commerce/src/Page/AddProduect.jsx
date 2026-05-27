  import React, { useState, useEffect } from "react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
  import { useForm, Controller } from "react-hook-form";
  import axios from "@/Config/axios";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";

  function AdminAddProduct() {
    const [Product, SetProduct] = useState([]);
    const [Brand, setBrand] = useState([]);
    const [tax, setTax] = useState([]);
    const [Discount, setdicount] = useState([]);
    const [categories, setCategories] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const { register, handleSubmit, control } = useForm();

    const [file, Setfile] = useState(null);
    const [filename, Setfilename] = useState("");

    const Savefile = (e) => {
      const fileObj = e.target.files[0];
      if (fileObj) {
        Setfile(fileObj);
        Setfilename(fileObj.name);
      }
    };

    const onSubmit = async (items) => {
      try {
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("filename", filename);
        formdata.append("productname", items.productname);
        formdata.append("price", items.price);
        formdata.append("Stock", items.Stock);
        formdata.append("category", items.category);
        formdata.append("discount", items.discount);
        formdata.append("about", items.about);
        formdata.append("Tax", items.tax);
        formdata.append("Brand", items.brand);
        formdata.append("seller", items.seller);

        const { data } = await axios.post("/Produect", formdata);
        alert(data.message);
      } catch (error) {
        alert(error.message);
      }
    };
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/FetchProduct");
        if (data.success) {
          SetProduct(data.data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get("/fetch-category");
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    const fetchtax = async () => {
      try {
        const { data } = await axios.get("/fetch-tax");
        if (data.success) {
          setTax(data.data);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    const fetchBrand = async () => {
      try {
        const { data } = await axios.get("/fetch-brand");
        if (data.success) {
          setBrand(data.data);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    const fetchdiscount= async () => {
      try {
        const { data } = await axios.get("/fetch-discount");
        if (data.success) {
          setdicount(data.data);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    useEffect(() => {
      fetchData();
      fetchCategory();
      fetchdiscount();
      fetchBrand();
      fetchtax();
    }, []);

    return (
      <>
        <div className="p-6 bg-zinc-100 min-h-screen">
          <div className="max-w-6xl mx-auto bg-white shadow p-6 rounded-lg">
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? "Close Form" : "Add Products"}
            </Button>

            {showForm && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 grid grid-cols-2 gap-4 bg-zinc-50 p-6 rounded-lg"
              >
                {/* Product Name */}
                <div>
                  <Label>Product Name</Label>
                  <Input
                    placeholder="Product Name"
                    {...register("productname", { required: true })}
                  />
                </div>

                {/* Price */}
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    placeholder="Price"
                    {...register("price", { required: true })}
                  />
                </div>
                {/* Stock */}
                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    placeholder="Stock"
                    {...register("Stock", { required: true })}
                  />
                </div>

                {/* Category */}
                <div>
                  <Label>Category</Label>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat._id} value={cat._id}>
                                {cat.categoryName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                  />
                </div>
                {/* Discount */}
                <div>
                  <Label>Discount</Label>
                  <Controller
                    name="discount"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select discount" />
                        </SelectTrigger>
                        <SelectContent>
                          {Discount.map((items)=>(

                          <SelectItem key={items._id} value={items._id}>{items.discountValue}%</SelectItem>
            ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* About (Full width) */}
                <div className="col-span-2">
                  <Label>About</Label>
                  <Textarea placeholder="About product" {...register("about")} />
                </div>

                {/* Tax */}
                <div>
                  <Label>Tax</Label>
                  <Controller
                    name="tax"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tax" />
                        </SelectTrigger>
                        <SelectContent>
                          {tax.map((items)=>(

                          <SelectItem  key={items._id}value={items._id}>{items.taxValue}%</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Brand */}
                <div>
                  <Label>Brand</Label>
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {Brand.map((items)=>(       
                          <SelectItem key={items._id} value={items._id}>{items.BrandName}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Seller */}
                <div>
                  <Label>Seller</Label>
                  <Input placeholder="Seller" {...register("seller")} />
                </div>

                {/* Image */}
                <div>
                  <Label>Image</Label>
                  <Input type="file" accept="image/*" onChange={Savefile} />
                </div>

                <div className="col-span-2">
                  <Button className="w-full">Submit</Button>
                </div>
              </form>
            )}

            {/* Product Table */}
            <h1 className="text-2xl font-bold mt-10 mb-4">Products List</h1>

            <Table>
              <TableHeader>
                <TableRow className="bg-zinc-200">
                  <TableHead>S.No</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Product.length > 0 ? (
                  Product.map((product,index) => (
                    <TableRow key={product.id}>
                        <TableCell>{index+1}</TableCell>
                      <TableCell>
                        <img
                          src={product.file}
                          className="w-16 h-16 rounded"
                          alt=""
                        />
                      </TableCell>
                      <TableCell>{product.productname}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell><Button>Edit</Button></TableCell>
                      <TableCell><Button>Delete</Button></TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4">No products found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    );
  }

  export default AdminAddProduct;
