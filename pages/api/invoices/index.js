import clientPromise from "../../../lib/mongodb";

async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getInvoice(req, res);
    }

    case "POST": {
      return addInvoice(req, res);
    }
  }
}

export default handler;

async function addInvoice(req, res) {
  try {
    const client = await clientPromise;

    if (req.method === "POST") {
      const invoice = {
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
      };

      const db = client.db();
      const collection = db.collection("invoices");
      await collection.insertOne(invoice);

      return res.status(200).json({ message: "Invoice added successfully" });
    }
  } catch (error) {
    return res.json({
      message: new Error(error).message,
    });
  }
}

async function getInvoice(req, res) {
  try {
    // connect to the database
    // let { db } = await clientPromise;
    const client = await clientPromise;
    const db = client.db();
    // fetch the posts
    let invoices = await db
      .collection("invoices")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    // return the posts
    return res.json(JSON.parse(JSON.stringify(invoices)));
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
