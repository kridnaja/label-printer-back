const prisma = require("../models/prisma");
var axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();
exports.addZohoData = async (req, res, next) => {
  try {
    

    ////////////////////////
    const secondConfig = {
      method: "post",
      url: process.env.ZOHO_FIRST_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie:
          "JSESSIONID=7053B7EBF85448B3FC3A7ABE456AEC83; _zcsr_tmp=44839945-fde5-4c42-9eec-e98b1b619247; iamcsr=44839945-fde5-4c42-9eec-e98b1b619247; zalb_b266a5bf57=a7f15cb1555106de5ac96d088b72e7c8",
      },
      data: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token:
          process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
      }),
    };

    const secondResponse = await axios(secondConfig);
    const accessToken = secondResponse.data.access_token;

    const lastConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: process.env.ZOHO_SECOND_URL ,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        Cookie:
          "ZCNEWLIVEUI=true; _zcsr_tmp=f09600ae-44ac-4e88-87c7-e1d0c8d2a333; zalb_442b5845d7=bf0bdc2fa4f4c1d32cc406c8ae7a93bf; zccpn=f09600ae-44ac-4e88-87c7-e1d0c8d2a333",
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    const responseFromZoho = await axios
      .request(lastConfig)
      .then((response) => response.data.data);

    /////////////////////////////



    ////////////////////////////

    const existIdData = await prisma.order.findMany({
      where: {
        OrderId: {
          in: responseFromZoho.map((data) => data.ID),
        },
      },
    });

    const existDataIds = new Set(existIdData.map((item) => item.OrderId));

    const dataToCreateAfterFilter = responseFromZoho.filter(
      (item) => !existDataIds.has(item.ID)
    );
    const dataToUpdateAfterFilter = responseFromZoho.filter((item) =>
      existDataIds.has(item.ID)
    );

    for (let data of dataToUpdateAfterFilter) {
      if (data.Address === null) {
        data.Address = {};
        data.Address.Location_Name = "-";
      }

      await prisma.order.update({
        where: {
          OrderId: data.ID,
        },
        data: {
          Status: data.Status,
          SKUArtwork_Preview: data["SKU.Artwork_Preview"],
          Administrator: data.Administrator.First_Name_EN,
          Address: data.Address.Location_Name,
          CustomerAdded_Time: data["Customer.Added_Time"],
          CustomerCustomer_Code: data["Customer.Customer_Code"],
          Delivery_Method: data.Delivery_Method,
          Address_Details: data.Address_Details,
          Material: data.Material,
          PrintStatus: false,
          SKU: data.SKU.SKU,
          Quantity: data.Quantity,
          Recipient: data.Address.Recipient,
          SKU_Artwork_File: data["SKU.Artwork_File"],
          Image: data["SKU.Artwork_Preview"].slice(128, 141),
        },
      });

      console.log(`Order updated: ${data.ID}`);
    }

    const ordersToCreate = await dataToCreateAfterFilter.map((data) => ({
      OrderId: data.ID,
      Status: data.Status,
      SKUArtwork_Preview: data["SKU.Artwork_Preview"],
      Administrator: data.Administrator.First_Name_EN,
      Address: data.Address.Location_Name,
      CustomerAdded_Time: data["Customer.Added_Time"],
      CustomerCustomer_Code: data["Customer.Customer_Code"],
      Delivery_Method: data.Delivery_Method,
      Address_Details: data.Address_Details,
      Material: data.Material,
      PrintStatus: false,
      SKU: data.SKU.SKU,
      Quantity: data.Quantity,
      Recipient: data.Address.Recipient,
      SKU_Artwork_File: data["SKU.Artwork_File"],
      Image: data["SKU.Artwork_Preview"].slice(128, 141),
    }));

    const imageResult =  await dataToCreateAfterFilter.map(async(data) => {
      try {
        let targetId = data["SKU.Artwork_Preview"].slice(50, 141);
        const imageUrl = `https://creator.zoho.com/api/v2.1/evalabel/gemicks/report/All_Jobs/${targetId}`;
        ////
        const imageResponse = await axios.get(imageUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "arraybuffer",
        });

        const filename = `${data["SKU.Artwork_Preview"].slice(128, 141)}.jpg`;
        const folderPath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "frontend",
          "images"
        );
        ////
        await  fs.mkdir(folderPath, { recursive: true });

        const filePath = path.join(folderPath, filename);
        ////
         await fs.writeFile(filePath, imageResponse.data);

        console.log(`Image saved: ${filename}`);
      } catch (error) {
        console.log("Error : ", error.message);
      }
    });
    let createdRes = await prisma.order.createMany({
      data: ordersToCreate,
    });

    if(imageResult){

     return res.status(201).json("Uploaded successfully!!");
    }
  } catch (error) {
    console.error("Error:", error.message);
    next(error);
  }
};



exports.readCompleteStatus = async (req, res, next) => {
  try {
    const afterRead = await prisma.order.findMany({
      where: {
        Status: "Completed",
      },
    });

    res.status(200).json(afterRead);
  } catch (error) {
    console.log(error);
  }
};

exports.readDeliveringStatus = async (req, res, next) => {
  try {
    const afterRead = await prisma.order.findMany({
      where: {
        Status: "Delivering",
      },
    });
    res.status(200).json(afterRead);
  } catch (error) {
    console.log(error);
  }
};
exports.readPendingProductionStatus = async (req, res, next) => {
  try {
    const afterRead = await prisma.order.findMany({
      where: {
        Status: "Pending Production",
      },
    });
    res.status(200).json(afterRead);
  } catch (error) {
    console.log(error);
  }
};

exports.readInProductionStatus = async (req, res, next) => {
  try {
    const afterRead = await prisma.order.findMany({
      where: {
        Status: "In Production",
      },
    });
    res.status(200).json(afterRead);
  } catch (error) {
    console.log(error);
  }
};

exports.readPendingDeliveryStatus = async (req, res, next) => {
  try {
    const afterRead = await prisma.order.findMany({
      where: {
        Status: "Pending Delivery",
      },
    });

    res.status(200).json(afterRead);
  } catch (error) {
    console.log(error);
  }
};
