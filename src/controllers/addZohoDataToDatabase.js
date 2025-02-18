const prisma = require("../models/prisma");
var axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
exports.addZohoData = async (req, res, next) => {
  try {
    // First request to get refresh token
    //     let firstScope = null
    //     if(!firstScope){

    //     }
    //     const firstConfig = {
    //       method: "post",
    //       url: "https://accounts.zoho.com/oauth/v2/token",
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         Cookie:
    //           "JSESSIONID=7053B7EBF85448B3FC3A7ABE456AEC83; _zcsr_tmp=44839945-fde5-4c42-9eec-e98b1b619247; iamcsr=44839945-fde5-4c42-9eec-e98b1b619247; zalb_b266a5bf57=a7f15cb1555106de5ac96d088b72e7c8",
    //       },
    //       data: new URLSearchParams({
    //         grant_type: "authorization_code",
    //         client_id: "1000.0Q0I5ERWNOZJS1F98OTZ5QRKQ8PBEP",
    //         client_secret: "edbb706a99da0b1220d9b76c2825d13c1d78c82235",
    //         redirect_uri: "https://evathai.com/GP",
    //         code: "1000.fa9222f3432b5821bea5f656216040f9.b06032baec0b67e624834d5600974797",
    //       }),
    //     };

    //     const firstResponse = await axios(firstConfig);
    //     const refreshToken = firstResponse.data.refresh_token;
    // console.log(refreshToken)
    // Second request to get access token using refresh token

    ///////////////////////////
    // const secondConfig = {
    //   method: "post",
    //   url: "https://accounts.zoho.com/oauth/v2/token",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Cookie:
    //       "JSESSIONID=7053B7EBF85448B3FC3A7ABE456AEC83; _zcsr_tmp=44839945-fde5-4c42-9eec-e98b1b619247; iamcsr=44839945-fde5-4c42-9eec-e98b1b619247; zalb_b266a5bf57=a7f15cb1555106de5ac96d088b72e7c8",
    //   },
    //   data: new URLSearchParams({
    //     grant_type: "refresh_token",
    //     refresh_token:
    //       "1000.8f836ab0cfa57bb06be3bc45783e6e18.b30ffd72155e416e048e2e306f79a326",
    //     client_id: "1000.0Q0I5ERWNOZJS1F98OTZ5QRKQ8PBEP",
    //     client_secret: "edbb706a99da0b1220d9b76c2825d13c1d78c82235",
    //   }),
    // };

    // const secondResponse = await axios(secondConfig);
    // const accessToken = secondResponse.data.access_token;

    // let lastConfig = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: "https://creator.zoho.com/api/v2.1/evalabel/gemicks/report/Barcode_Printer",
    //   headers: {
    //     Authorization: `Zoho-oauthtoken ${accessToken}`,
    //     Cookie:
    //       "ZCNEWLIVEUI=true; _zcsr_tmp=f09600ae-44ac-4e88-87c7-e1d0c8d2a333; zalb_442b5845d7=bf0bdc2fa4f4c1d32cc406c8ae7a93bf; zccpn=f09600ae-44ac-4e88-87c7-e1d0c8d2a333",
    //     Accept: "application/json",
    //     "Content-Type": "application/json; charset=utf-8",
    //   },
    // };

    // let resposneFromZoho = await axios.request(lastConfig).then((response) => {
    //   return response.data.data;
    // });

    // resposneFromZoho.map(async (data) => {
    //   const response = await axios.get(
    //     `https://creator.zoho.com/api/v2.1/evalabel/gemicks/report/All_Jobs/${data[
    //       "SKU.Artwork_Preview"
    //     ].slice(50, 141)}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //       responseType: "arraybuffer", // Ensure response type is set to arraybuffer for binary data
    //     }
    //   );

    //   if (response) {
    //     const filename = `${data["SKU.Artwork_Preview"].slice(128, 141)}.jpg`; // Adjust filename as needed
    //     const folderPath = path.join(
    //       __dirname,
    //       "..",
    //       "..",
    //       "..",
    //       "frontend",
    //       "images"
    //     ); // Adjust path to 'images' folder

    //     // Ensure the directory exists, create it if it doesn't
    //     await fs.mkdir(folderPath, { recursive: true });

    //     const filePath = path.join(folderPath, filename);

    //     // Write the downloaded image data to file
    //     await fs.writeFile(filePath, response.data);
    //   }
    // });

    // const existIdData = await prisma.order.findMany({
    //   where: {
    //     OrderId: {
    //       in: resposneFromZoho.map((data) => data.ID),
    //     },
    //   },
    // });
    // const existDataIds = new Set(existIdData.map((item) => item.OrderId));

    // const dataToCreateAfterFilter = await resposneFromZoho.filter(
    //   (item) => !existDataIds.has(item.ID)
    // );

    // const dataToUpdateAFterFilter = await resposneFromZoho.filter((item) =>
    //   existDataIds.has(item.ID)
    // );

    // for (let data of dataToUpdateAFterFilter) {
    //   if (data.Address === null) {
    //     data.Address = {};
    //     data.Address.Location_Name = "-";
    //   }

    //   prisma.order
    //     .update({
    //       where: {
    //         OrderId: data.ID,
    //       },
    //       data: {
    //         Status: data.Status,
    //         SKUArtwork_Preview: data["SKU.Artwork_Preview"],
    //         Administrator: data.Administrator.First_Name_EN,
    //         Address: data.Address.Location_Name,
    //         CustomerAdded_Time: data["Customer.Added_Time"],
    //         CustomerCustomer_Code: data["Customer.Customer_Code"],
    //         Delivery_Method: data.Delivery_Method,
    //         Address_Details: data.Address_Details,
    //         Material: data.Material,
    //         PrintStatus: false,
    //         SKU: data.SKU.SKU,
    //         Quantity: data.Quantity,
    //         Recipient: data.Address.Recipient,
    //         SKU_Artwork_File: data["SKU.Artwork_File"],
    //         Image: data["SKU.Artwork_Preview"].slice(128, 141),
    //       },
    //     })
    //     .then(() => console.log("updated success"))
    //     .catch((err) => console.log(err));
    // }

    // const orderToCreate = dataToCreateAfterFilter.map((data) => ({
    //   OrderId: data.ID,
    //   Status: data.Status,
    //   SKUArtwork_Preview: data["SKU.Artwork_Preview"],
    //   Administrator: data.Administrator.First_Name_EN,
    //   Address: data.Address.Location_Name,
    //   CustomerAdded_Time: data["Customer.Added_Time"],
    //   CustomerCustomer_Code: data["Customer.Customer_Code"],
    //   Delivery_Method: data.Delivery_Method,
    //   Address_Details: data.Address_Details,
    //   Material: data.Material,
    //   PrintStatus: false,
    //   SKU: data.SKU.SKU,
    //   Quantity: data.Quantity,
    //   Recipient: data.Address.Recipient,
    //   SKU_Artwork_File: data["SKU.Artwork_File"],
    //   Image: data["SKU.Artwork_Preview"].slice(128, 141),
    // }));

    // await prisma.order.createMany({
    //   data: orderToCreate,
    // });

    ////////////////////////
    const secondConfig = {
      method: "post",
      url: "https://accounts.zoho.com/oauth/v2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie:
          "JSESSIONID=7053B7EBF85448B3FC3A7ABE456AEC83; _zcsr_tmp=44839945-fde5-4c42-9eec-e98b1b619247; iamcsr=44839945-fde5-4c42-9eec-e98b1b619247; zalb_b266a5bf57=a7f15cb1555106de5ac96d088b72e7c8",
      },
      data: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token:
          "1000.8f836ab0cfa57bb06be3bc45783e6e18.b30ffd72155e416e048e2e306f79a326",
        client_id: "1000.0Q0I5ERWNOZJS1F98OTZ5QRKQ8PBEP",
        client_secret: "edbb706a99da0b1220d9b76c2825d13c1d78c82235",
      }),
    };

    const secondResponse = await axios(secondConfig);
    const accessToken = secondResponse.data.access_token;

    // Step 2: Fetch data from Zoho Creator
    const lastConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://creator.zoho.com/api/v2.1/evalabel/gemicks/report/Barcode_Printer",
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
