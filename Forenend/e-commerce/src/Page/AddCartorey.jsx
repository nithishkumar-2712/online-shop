import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "@/Config/axios";

function AdminCategory() {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");

  // ------------------------------
  // ADD CATEGORY
  // ------------------------------
  const addCategory = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/add-category", {
        categoryName,
        categoryCode,
      });

      alert(data.message);
      fetchCategories();
      setCategoryName("");
      setCategoryCode("");
    } catch (error) {
      alert(error.message);
    }
  };

  // ------------------------------
  // FETCH CATEGORIES
  // ------------------------------
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/fetch-category");
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-zinc-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6">

        {/* Button */}
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Category Form" : "Add Category"}
        </Button>

        {/* Add Category Form */}
        {showForm && (
          <form
            onSubmit={addCategory}
            className="grid grid-cols-2 gap-4 bg-zinc-50 p-6 rounded-lg mt-6"
          >
            <div>
              <Label>Category Name</Label>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
                required
              />
            </div>

            <div>
              <Label>Category Code</Label>
              <Input
                value={categoryCode}
                onChange={(e) => setCategoryCode(e.target.value)}
                placeholder="Enter Category Code"
                required
              />
            </div>

            <div className="col-span-2">
              <Button className="w-full">Add Category</Button>
            </div>
          </form>
        )}

        {/* Category Table */}
        <h1 className="text-2xl font-bold mt-10 mb-4">Category List</h1>

        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-200">
              <TableHead>S.No</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Category Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <TableRow key={cat._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{cat.categoryName}</TableCell>
                  <TableCell>{cat.categoryCode}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-sm rounded bg-green-200 text-green-800">
                      Active
                    </span>
                  </TableCell>

                  <TableCell className="text-center space-x-2">
                    <Button className="bg-blue-500 text-white px-3">Edit</Button>
                    <Button className="bg-red-500 text-white px-3">Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No categories added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminCategory;
