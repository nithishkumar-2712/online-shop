import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "@/Config/axios";

function AdminBrand() {
  const [showForm, setShowForm] = useState(false);
  const [brands, setBrands] = useState([]);

  const [BrandName, setBrandName] = useState("");
  const [brandCode, setBrandCode] = useState("");

  // ------------------------------
  // ADD BRAND
  // ------------------------------
  const addBrand = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/add-brand", {
        BrandName,
        brandCode,
      });

      alert(data.message);
      fetchBrands();
      setBrandName("");
      setBrandCode("");
    } catch (error) {
      alert(error.message);
    }
  };

  // ------------------------------
  // FETCH BRANDS
  // ------------------------------
  const fetchBrands = async () => {
    try {
      const { data } = await axios.get("/fetch-brand");
      if (data.success) {
        setBrands(data.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-zinc-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6">

        {/* Toggle Button */}
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Brand Form" : "Add Brand"}
        </Button>

        {/* Brand Form */}
        {showForm && (
          <form
            onSubmit={addBrand}
            className="grid grid-cols-2 gap-4 bg-zinc-50 p-6 rounded-lg mt-6"
          >
            <div>
              <Label>Brand Name</Label>
              <Input
                value={BrandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter Brand Name"
                required
              />
            </div>

            <div>
              <Label>Brand Code</Label>
              <Input
                value={brandCode}
                onChange={(e) => setBrandCode(e.target.value)}
                placeholder="Enter Brand Code"
                required
              />
            </div>

            <div className="col-span-2">
              <Button className="w-full">Add Brand</Button>
            </div>
          </form>
        )}

        {/* Brand Table */}
        <h1 className="text-2xl font-bold mt-10 mb-4">Brand List</h1>

        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-200">
              <TableHead>S.No</TableHead>
              <TableHead>Brand Name</TableHead>
              {/* <TableHead>Brand Code</TableHead> */}
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {brands.length > 0 ? (
              brands.map((brand, index) => (
                <TableRow key={brand._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{brand.BrandName}</TableCell>
                  {/* <TableCell>{brand.brandCode}</TableCell> */}

                  <TableCell>
                    <span className="px-2 py-1 text-sm rounded bg-green-200 text-green-800">
                      Active
                    </span>
                  </TableCell>

                  <TableCell className="text-center space-x-2">
                    <Button className="bg-blue-500 text-white px-3">
                      Edit
                    </Button>
                    <Button className="bg-red-500 text-white px-3">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center py-4">
                  No brands found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
    </div>
  );
}

export default AdminBrand;
