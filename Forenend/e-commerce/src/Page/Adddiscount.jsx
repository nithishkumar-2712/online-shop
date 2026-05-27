import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "@/Config/axios";

function AdminDiscount() {
  const [showForm, setShowForm] = useState(false);
  const [discounts, setDiscounts] = useState([]);

  const [discountName, setDiscountName] = useState("");
  const [discountValue, setDiscountValue] = useState("");

  // ------------------------------
  // ADD DISCOUNT
  // ------------------------------
  const addDiscount = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/add-discount", {
        discountName,
        discountValue,
      });

      alert(data.message);
      fetchDiscounts();
      setDiscountName("");
      setDiscountValue("");
    } catch (error) {
      alert(error.message);
    }
  };

  // ------------------------------
  // FETCH DISCOUNTS
  // ------------------------------
  const fetchDiscounts = async () => {
    try {
      const { data } = await axios.get("/fetch-discount");
      if (data.success) {
        setDiscounts(data.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-zinc-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6">

        {/* Button */}
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Discount Form" : "Add Discount"}
        </Button>

        {/* Add Discount Form */}
        {showForm && (
          <form
            onSubmit={addDiscount}
            className="grid grid-cols-2 gap-4 bg-zinc-50 p-6 rounded-lg mt-6"
          >
            <div>
              <Label>Discount Name</Label>
              <Input
                value={discountName}
                onChange={(e) => setDiscountName(e.target.value)}
                placeholder="Enter Discount Name"
                required
              />
            </div>

            <div>
              <Label>Discount Value (%)</Label>
              <Input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="Enter Discount %"
                required
              />
            </div>

            <div className="col-span-2">
              <Button className="w-full">Add Discount</Button>
            </div>
          </form>
        )}

        {/* Discount Table */}
        <h1 className="text-2xl font-bold mt-10 mb-4">Discount List</h1>

        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-200">
              <TableHead>S.No</TableHead>
              {/* <TableHead>Discount Name</TableHead> */}
              <TableHead>Discount Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {discounts.length > 0 ? (
              discounts.map((disc, index) => (
                <TableRow key={disc._id}>
                  <TableCell>{index + 1}</TableCell>
                  {/* <TableCell>{disc.discountName}</TableCell> */}
                  <TableCell>{disc.discountValue}%</TableCell>

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
                  No discounts added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminDiscount;
