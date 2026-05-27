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

function AdminTax() {
  const [showForm, setShowForm] = useState(false);
  const [taxList, setTaxList] = useState([]);

  const [taxName, setTaxName] = useState("");
  const [taxValue, setTaxValue] = useState("");

  // ------------------------------
  // ADD TAX
  // ------------------------------
  const addTax = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/add-tax", {
        taxName,
        taxValue,
      });

      alert(data.message);
      fetchTax();
      setTaxName("");
      setTaxValue("");
    } catch (error) {
      alert(error.message);
    }
  };

  // ------------------------------
  // FETCH TAX LIST
  // ------------------------------
  const fetchTax = async () => {
    try {
      const { data } = await axios.get("/fetch-tax");
      if (data.success) {
        setTaxList(data.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchTax();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-zinc-100 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6">

        {/* Toggle Button */}
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Tax Form" : "Add Tax"}
        </Button>

        {/* Tax Form */}
        {showForm && (
          <form
            onSubmit={addTax}
            className="grid grid-cols-2 gap-4 bg-zinc-50 p-6 rounded-lg mt-6"
          >
            <div>
              <Label>Tax Name</Label>
              <Input
                value={taxName}
                onChange={(e) => setTaxName(e.target.value)}
                placeholder="Enter Tax Name"
                required
              />
            </div>

            <div>
              <Label>Tax Value (%)</Label>
              <Input
                type="number"
                value={taxValue}
                onChange={(e) => setTaxValue(e.target.value)}
                placeholder="Enter Tax %"
                required
              />
            </div>

            <div className="col-span-2">
              <Button className="w-full">Add Tax</Button>
            </div>
          </form>
        )}

        {/* Tax Table */}
        <h1 className="text-2xl font-bold mt-10 mb-4">Tax List</h1>

        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-200">
              <TableHead>S.No</TableHead>
              {/* <TableHead>Tax Name</TableHead> */}
              <TableHead>Tax Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {taxList.length > 0 ? (
              taxList.map((tax, index) => (
                <TableRow key={tax._id}>
                  <TableCell>{index + 1}</TableCell>
                  {/* <TableCell>{tax.taxName}</TableCell> */}
                  <TableCell>{tax.taxValue}%</TableCell>

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
                <TableCell colSpan="5" className="text-center py-4">
                  No tax records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
    </div>
  );
}

export default AdminTax;
