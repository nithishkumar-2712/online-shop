"use client";

import AdminLayout from "./AdminLayout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminHome() {
  const totalProducts = 25;
  const totalUsers = 12;
  const totalOrders = 9;

  // Mock recent products
  const recentProducts = [
    { id: 1, name: "iPhone 15", price: "82000" },
    { id: 2, name: "Samsung S24", price: "78000" },
    { id: 3, name: "OnePlus 12", price: "62000" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="p-6 shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-4xl font-bold mt-3">{totalProducts}</p>
        </Card>

        <Card className="p-6 shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl font-bold mt-3">{totalUsers}</p>
        </Card>

        <Card className="p-6 shadow">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-4xl font-bold mt-3">{totalOrders}</p>
        </Card>
      </div>

      {/* Recent products */}
      <Card className="p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">Recent Products</h2>

        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-200">
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentProducts.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>₹{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </AdminLayout>
  );
}
