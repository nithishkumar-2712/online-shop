import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Customhook from "@/components/Customhook";
import axios from "@/Config/axios";

function AdminUsers() {
   const [users, setUsers] = useState([])
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     name: "Raja Kumar",
  //     email: "raja@example.com",
  //     number: "9876543210",
  //   },
  //   {
  //     id: 2,
  //     name: "Lakshmi Devi",
  //     email: "lakshmi@example.com",
  //     number: "9123456780",
  //   },
  //   {
  //     id: 3,
  //     name: "Arun Kumar",
  //     email: "arun@example.com",
  //     number: "9988776655",
  //   },
  // ]);

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };
// const {data}=Customhook("/getUser")
  // const { data, loading, error } = Customhook("/getUser");
  // if (loading) {
  //   return <h1>Loading....</h1>;
  // }
  // if (error) {
  //   return <h1>error...</h1>;
  // }
  // if (data) {
  //   console.log(data);
  // }
  const  fetuser=async()=>{
    try {
      const {data}=await axios.get("/getUser");
      if(data.success){
        alert(data.message);
        setUsers(data.data);
      }else{
        alert(data.message)
      }
    } catch (error) {
      alert(error.message)
    }
  }
useEffect(()=>{
fetuser();
},[])
  return (
    <div className="min-h-screen p-6 bg-zinc-100 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Users List</h1>

        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-200">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id} className="hover:bg-zinc-50">
                  <TableCell>{user.Name}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.Number}</TableCell>
                  <TableCell className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500 py-4"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default AdminUsers;
