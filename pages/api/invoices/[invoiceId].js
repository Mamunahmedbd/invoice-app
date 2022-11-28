import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getInvoice(req, res);
    }
    case "PUT": {
      return updateInvoice(req, res);
    }
    case "DELETE": {
      return deleteInvoice(req, res);
    }
  }
}

async function getInvoice(req, res) {
  try {
    // connect to the database
    const client = await clientPromise;
    const db = client.db();
    let { invoiceId } = req.query;
    // fetch the invoice
    let invoices = await db
      .collection("invoices")
      .findOne({ _id: new ObjectId(invoiceId) });
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

async function updateInvoice(req, res) {
  try {
    // connect to the database
    const client = await clientPromise;
    const db = client.db();
    let { invoiceId } = req.query;
    // update the paid status of the invoice
    await db.collection("invoices").updateOne(
      {
        _id: new ObjectId(invoiceId),
      },
      {
        $set: {
          status: "paid",
        },
      }
    );
    // return a message
    return res.status(200).json({
      message: "Post updated successfully",
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

async function deleteInvoice(req, res) {
  try {
    // Connecting to the database
    const client = await clientPromise;
    const db = client.db();
    let { invoiceId } = req.query;
    console.log(invoiceId);
    // Deleting the post
    await db.collection("invoices").deleteOne({
      _id: new ObjectId(invoiceId),
    });
    // returning a message
    return res.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    // returning an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
