import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getEditInvoice(req, res);
    }
    case "PUT": {
      return editInvoice(req, res);
    }
  }
}

export default handler;

async function getEditInvoice(req, res) {
  try {
    // connect to the database
    const client = await clientPromise;
    const db = client.db();
    console.log(req.query);
    let { id } = req.query;
    // console.log(id);
    // fetch the invoice
    let invoices = await db
      .collection("invoices")
      .findOne({ _id: new ObjectId(id) });
    // return the invoice
    return res.json(JSON.parse(JSON.stringify(invoices)));
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function editInvoice(req, res) {
  try {
    // connect to the database
    const client = await clientPromise;
    const db = client.db();
    let { id } = req.query;
    // update the paid status of the invoice
    await db.collection("invoices").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          senderAddress: {
            street: req.body.senderStreet,
            city: req.body.senderCity,
            postalCode: req.body.senderPostalCode,
            country: req.body.senderCountry,
          },
          clientName: req.body.clientName,
          clientEmail: req.body.clientEmail,
          clientAddress: {
            street: req.body.clientStreet,
            city: req.body.clientCity,
            postalCode: req.body.clientPostalCode,
            country: req.body.clientCountry,
          },
          createdAt: req.body.createdAt,
          paymentDue: req.body.createdAt,
          paymentTerms: req.body.paymentTerms,
          description: req.body.description,
          status: req.body.status,
          items: req.body.items,
          total: req.body.total,
        },
      }
    );

    // return a message
    return res.status(200).json({
      message: "Invoice updated successfully",
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
