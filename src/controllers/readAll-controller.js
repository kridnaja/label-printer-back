const { PrismaClient } = require("@prisma/client");
const prisma = require("../models/prisma");

exports.readAll = async (req, res, next) => {
  try {

    const afterReadAll = await prisma.order.findMany({
      orderBy:{
        OrderId: "desc"
      }
    });

    return res.status(200).json(afterReadAll);
  } catch (error) {
    console.log(error);
  }
};

exports.readPendingProduction = async (req, res, next) => {
  try {
    const readPenPro = await prisma.order.findMany({
      where: {
        Status: "Pending Production",
      },
    });
    return res.status(200).json(readPenPro);
  } catch (error) {
    console.log(error)
  }
};

exports.readInProduction = async (req, res, next) => {
  try {
    const readInPro = await prisma.order.findMany({
      where: {
        Status: "In Production",
      },
    });
    return res.status(200).json(readInPro);
  } catch (error) {
    console.log(error);
  }
};

exports.readDelivering = async (req, res, next) => {
  try {
    const readDelivering = await prisma.order.findMany({
      where: {
        Status: "Delivering",
      },
    });
    return res.status(200).json(readDelivering);
  } catch (error) {
    console.log(error);
  }
};
exports.readCompleted = async (req, res, next) => {
  try {
    const readCompleted = await prisma.order.findMany({
      where: {
        Status: "Completed",
      },
    });
    return res.status(200).json(readCompleted);
  } catch (error) {
    console.log(error);
  }
};
exports.readPendingDelivery = async (req, res, next) => {
  try {
    const readPendingPending = await prisma.order.findMany({
      where: {
        Status: "Pending Delivery",
      },
    });

    return res.status(200).json(readPendingPending);
  } catch (error) {
    console.log(error);
  }
};

exports.search = async (req, res, next) => {
  try {

    const afteSearch = await prisma.order.findMany({
      where: {
        OR: [
          { Material: { contains: req.query.q } },
          { Status: { contains: req.query.q } },
          { Recipient: { contains: req.query.q } },
          { SKUArtwork_Preview: { contains: req.query.q } },
          { SKU: { contains: req.query.q } },
          { CustomerAdded_Time: { contains: req.query.q } },
          { Address_Details: { contains: req.query.q } },
          { Address: { contains: req.query.q } },
          { Delivery_Method: { contains: req.query.q } },
          { CustomerCustomer_Code: { contains: req.query.q } },
          { Administrator: { contains: req.query.q } },
          { Quantity: { contains: req.query.q } },
        ],
      },
    });

    return res.status(200).json(afteSearch);
  } catch (error) {
    console.log(error);
  }
};
