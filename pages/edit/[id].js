import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const EditItem = (props) => {
  const invoice = props.data;
  const router = useRouter();

  const [items, setItems] = useState(invoice.items);

  const [senderStreet, setSenderStreet] = useState("");
  const [senderCity, setSenderCity] = useState("");
  const [senderPostalCode, setSenderPostalCode] = useState("");
  const [senderCountry, setSenderCountry] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientPostalCode, setClientPostalCode] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");

  // add product item
  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
  };

  // handler change
  const handlerChange = (event, i) => {
    const { name, value } = event.target;
    const list = [...items];
    list[i][name] = value;
    list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    setItems(list);
  };

  // delete product item
  const deleteItem = (i) => {
    const inputData = [...items];
    inputData.splice(i, 1);
    setItems(inputData);
  };

  // total amount of all product items
  const totalAmount = items.reduce((acc, curr) => acc + curr.total, 0);

  // update invoice in database
  const updateInvoice = async (invoiceId, status) => {
    try {
      const res = await fetch(`/api/edit/${invoiceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderStreet: senderStreet,
          senderCity: senderCity,
          senderPostalCode: senderPostalCode,
          senderCountry: senderCountry,
          clientName: clientName,
          clientEmail: clientEmail,
          clientStreet: clientStreet,
          clientCity: clientCity,
          clientPostalCode: clientPostalCode,
          clientCountry: clientCountry,
          description: description,
          createdAt: createdAt,
          paymentDue: createdAt,
          paymentTerms: paymentTerms,
          status: status,
          items: items,
          total: totalAmount,
        }),
      });

      const data = await res.json();

      router.push(`/invoices/${invoiceId}`);
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // set default input data
  useEffect(() => {
    setSenderCity(invoice.senderAddress.city);
    setSenderStreet(invoice.senderAddress.street);
    setSenderPostalCode(invoice.senderAddress.postalCode);
    setSenderCountry(invoice.senderAddress.country);

    setClientCity(invoice.clientAddress.city);
    setClientStreet(invoice.clientAddress.street);
    setClientPostalCode(invoice.clientAddress.postalCode);
    setClientCountry(invoice.clientAddress.country);

    setClientName(invoice.clientName);
    setClientEmail(invoice.clientEmail);
    setDescription(invoice.description);
    setCreatedAt(invoice.createdAt);
    setPaymentTerms(invoice.paymentTerms);
  }, [invoice]);
  const goBack = () => router.push(`/invoices/${invoice._id}`);
  return (
    <div className="main__container">
      <div className="back__btn">
        <h6 onClick={goBack}>Go Back</h6>
      </div>
      <div className="new__invoice">
        <div className="new__invoice-header">
          <h3>Edit #{invoice._id.substr(0, 6).toUpperCase()}</h3>
        </div>

        {/* ======== new invoice body ========= */}
        <div className="new__invoice-body">
          {/* ======= bill from ========== */}
          <div className="bill__from">
            <p className="bill__title">Bill from</p>
            <div className="form__group">
              <p>Street Address</p>
              <input
                type="text"
                value={senderStreet}
                onChange={(e) => setSenderStreet(e.target.value)}
              />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>City</p>
                <input
                  type="text"
                  value={senderCity}
                  onChange={(e) => setSenderCity(e.target.value)}
                />
              </div>

              <div>
                <p>Postal Code</p>
                <input
                  type="text"
                  value={senderPostalCode}
                  onChange={(e) => setSenderPostalCode(e.target.value)}
                />
              </div>

              <div>
                <p>Country</p>
                <input
                  type="text"
                  value={senderCountry}
                  onChange={(e) => setSenderCountry(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ========= bill to ========== */}
          <div className="bill__to">
            <p className="bill__title">Bill to</p>
            <div className="form__group">
              <p>Client Name</p>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div className="form__group">
              <p>Client Email</p>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>

            <div className="form__group">
              <p>Street Address</p>
              <input
                type="email"
                value={clientStreet}
                onChange={(e) => setClientStreet(e.target.value)}
              />
            </div>

            <div className="form__group inline__form-group">
              <div>
                <p>City</p>
                <input
                  type="text"
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                />
              </div>

              <div>
                <p>Postal Code</p>
                <input
                  type="text"
                  value={clientPostalCode}
                  onChange={(e) => setClientPostalCode(e.target.value)}
                />
              </div>

              <div>
                <p>Country</p>
                <input
                  type="text"
                  value={clientCountry}
                  onChange={(e) => setClientCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="form__group inline__form-group">
              <div className="inline__group">
                <p>Invoice Date</p>
                <input
                  type="date"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                />
              </div>

              <div className="inline__group">
                <p>Payment Terms</p>
                <input
                  type="text"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                />
              </div>
            </div>

            <div className="form__group">
              <p>Project Description</p>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* ========= invoice product items =========*/}

          <div className="invoice__items">
            <h3>Item List</h3>
            {items?.map((item, i) => (
              <div className="item" key={i}>
                <div className="form__group inline__form-group">
                  <div>
                    <p>Item Name</p>
                    <input
                      type="text"
                      name="name"
                      value={item.name}
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Qty</p>
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Price</p>
                    <input
                      type="number"
                      name="price"
                      value={item.price}
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>
                  <div>
                    <p>Total</p>
                    <h4>{item.total}</h4>
                  </div>

                  <button className="edit__btn" onClick={() => deleteItem(i)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="add__item-btn" onClick={addItem}>
            Add New Item
          </button>
          <div className="new__invoice__btns" style={{ justifyContent: "end" }}>
            <div>
              <button
                className="draft__btn"
                onClick={() => router.push(`/invoices/${invoice._id}`)}
              >
                Cancel
              </button>
              <button
                className="mark__as-btn"
                onClick={() => updateInvoice(invoice._id, invoice.status)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;

// export async function getStaticPaths() {
//   let response = await fetch("http://localhost:3000/api/invoices");
//   // extract the data
//   let invoices = await response.json();
//   // console.log(invoices);

//   return {
//     fallback: false,
//     paths: invoices.map((invoice) => ({
//       params: {
//         id: invoice._id,
//       },
//     })),
//   };
// }

export async function getServerSideProps(context) {
  // console.log(context);
  const { id } = context.params;

  let response = await fetch(`http://localhost:3000/api/edit/${id}`);
  // extract the data
  let invoice = await response.json();

  return {
    props: {
      data: invoice,
    },
    revalidate: 1,
  };
}
