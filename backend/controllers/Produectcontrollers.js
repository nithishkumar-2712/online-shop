const dicountModel = require("../Model/Discount");
const OrederModel = require("../Model/OrderSuccess");
const ProductModel = require("../Model/Product");
const registerModel = require("../Model/Register");
const reviewModel = require("../Model/Review");
const taxModel = require("../Model/Tax");
// const  redis=require("ioredis")
const Allproduct = async (req, res) => {
    try {
        const {productname,sellingCost,PurchasingRate,Mrp,category,Stock,discount,about,Tax,seller,Brand} = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.json({ success: false, message: "file is required" });
        }

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const fileUrls = files.map(file => 
            `${baseUrl}/public/image/${file.filename}`
        );

        const taxvalues = await taxModel.findById(Tax);
        const taxamount = sellingCost * taxvalues.taxValue / 100;
        const finalTax = sellingCost - taxamount;

        const discountvalues =await dicountModel.findById(discount);
        const discountAmount = sellingCost * discountvalues.discountValue / 100;
        const finalPrice = sellingCost - discountAmount;
        const profit =Number(sellingCost) -Number(PurchasingRate);
        console.log(profit);

        const data = await ProductModel.create({
            productname,
            Mrp,
            discountAmount,
            sellingCost,
            PurchasingRate,
            category,
            finalPrice,
            finalTax,
            discount,
            about,
            seller,
            Stock,
            Tax,
            Brand,
            profit,
            file: fileUrls
        });

        res.json({ success: true, message: "successfully product create", data });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
const Fetchproduct=async(req,res)=>{
    try {
        const data=await ProductModel.find({check:true}).limit(100).skip(0).populate("category").populate("discount").populate("Brand")
        res.status(200).json({success:true,message:"get All Produect",data})
    } catch (error) {
        res.status(200).json({success:false,message:`serever error${error.message}`})
        
    }
}
const Fetchsingleproduct=async(req,res)=>{
    const{id}=req.body
    // console.log(id)
    try {
        const data=await ProductModel.find({_id:id}).populate("category").populate("discount").populate("Brand")
        const reviews = await reviewModel.find({ product: id,status:"Approved"}).populate("UserId");
        console.log(`reviews${reviews}`);
        const categoryId = data[0]?.category?._id;
        const Related=await ProductModel.find({category:categoryId,_id:{$ne:id}}).limit(3).populate("category").populate("discount").populate("Brand")
        // console.log(`related${Related}`);
        res.status(200).json({success:true,message:"get All Produect",data,Related,reviews})
    } catch (error) {
        res.status(200).json({success:false,message:`serever error${error.message}`})
        
    }
}
const Adminproduct=async(req,res)=>{
    const page = parseInt(req.params.page) || 1;
    // console.log(page)
    const limit=10;
    const skipepage=(page-1)*limit
    try {
         const total = await ProductModel.countDocuments();

        const data=await ProductModel.aggregate([
            {$skip:skipepage},
            {$limit:limit}
        ]);
        res.status(200).json({success:true,message:"get All Produect",data,total})
    } catch (error) {
        res.status(200).json({success:false,message:`serever error${error.message}`})
        
    }
}
const Deleteproduct=async(req,res)=>{
     try {

    const item = await ProductModel.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    // Toggle check value
    item.check = !item.check;

    await item.save();

    res.status(200).json({
      success: true,
      message: item.check
        ? "Item Restored Successfully"
        : "Item Deleted Successfully",
      data: item
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}
const FetchDashbord = async (req, res) => {
  try {
    // TOTAL COUNTS
    const totalUsers =
      await registerModel.countDocuments();

    const totalProducts =
      await ProductModel.countDocuments();

    const totalOrders =
      await OrederModel.countDocuments();

    // MONTHLY REVENUE
    const revenueData =
      await OrederModel.aggregate([
        {
          $match: {
            status: "Delivered",
          },
        },

        {
          $group: {
            _id: {
              $month: "$orderDate",
            },

            revenue: {
              $sum: "$total",
            },
          },
        },

        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    // TOTAL PROFIT
    const profitData =
      await OrederModel.aggregate([
        {
          $match: {
            status: "Delivered",
          },
        },

        {
          $unwind: "$products",
        },

        {
          $group: {
            _id: null,

            totalProfit: {
              $sum: "$products.profit",
            },
          },
        },
      ]);

    // FINAL PROFIT VALUE
    const totalProfit =
      profitData.length > 0
        ? profitData[0].totalProfit
        : 0;

    console.log(totalProfit);

    res.status(200).json({
      success: true,

      message: "Dashboard Data",

      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        revenueData,
        totalProfit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `server error ${error.message}`,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { editId } = req.params;

    console.log("ID:", editId);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      productname,
      sellingCost,
      price,
      category,
      Stock,
      discount,
      about,
      Tax,
      seller,
      Brand
    } = req.body;

    const taxvalues = await taxModel.findById(Tax);
    const taxamount = price * taxvalues.taxValue / 100;

    const finalTax = price - taxamount;

    const discountvalues = await dicountModel.findById(discount);
    const discountAmount = price * discountvalues.discountValue / 100;

    const finalPrice = price - discountAmount;

    const product = await ProductModel.findByIdAndUpdate(
      editId,
      {
        $set: {
          productname,
          sellingCost,
          price,
          category,
          finalPrice,
          finalTax,
          discount,
          about,
          seller,
          Stock,
          Tax,
          Brand,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const data=await ProductModel.findByIdAndUpdate(id,{$set: { Stock:stock} },{ new: true })
    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports={updateStock,Deleteproduct,Allproduct,Fetchproduct,Adminproduct,Fetchsingleproduct,FetchDashbord,updateProduct};