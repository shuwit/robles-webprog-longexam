import { useEffect, useState } from "react";
import Button from "../../components/Button";
import AdminTabs from "../../components/AdminTabs";
import { useAuth } from "../../context/AuthContext";
import { apiFormRequest, apiRequest, formatPrice, unwrapProducts } from "../../utils/api";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image: "",
  category: "",
  supplier: "",
};

const AdminProductsPage = () => {
  const { userInfo } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    try {
      const [productData, cats, sups] = await Promise.all([
        apiRequest("/api/products?limit=50"),
        apiRequest("/api/categories"),
        apiRequest("/api/suppliers"),
      ]);
      setProducts(unwrapProducts(productData));
      setCategories(cats);
      setSuppliers(sups);
      if (!form.category && cats[0]) {
        setForm((prev) => ({
          ...prev,
          category: prev.category || cats[0]._id,
          supplier: prev.supplier || sups[0]?._id || "",
        }));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const clearPreview = () => {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
    setImageFile(null);
  };

  const onFileChange = (e) => {
    const nextFile = e.target.files?.[0] || null;
    setError("");

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    if (!nextFile) {
      setImageFile(null);
      setPreviewUrl(form.image || "");
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(nextFile.type)) {
      setImageFile(null);
      setPreviewUrl(form.image || "");
      e.target.value = "";
      setError("Only JPEG, PNG, and WebP images are allowed.");
      return;
    }

    if (nextFile.size > MAX_IMAGE_BYTES) {
      setImageFile(null);
      setPreviewUrl(form.image || "");
      e.target.value = "";
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setImageFile(nextFile);
    setPreviewUrl(URL.createObjectURL(nextFile));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("stock", form.stock);
        formData.append("category", form.category);
        formData.append("supplier", form.supplier);
        formData.append("image", imageFile);

        await apiFormRequest(editId ? `/api/products/${editId}` : "/api/products", {
          method: editId ? "PUT" : "POST",
          token: userInfo.token,
          formData,
        });
      } else {
        const body = {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        };
        if (editId) {
          await apiRequest(`/api/products/${editId}`, {
            method: "PUT",
            token: userInfo.token,
            body,
          });
        } else {
          await apiRequest("/api/products", {
            method: "POST",
            token: userInfo.token,
            body,
          });
        }
      }
      setMessage(editId ? "Product updated" : "Product created");
      setForm({
        ...emptyForm,
        category: categories[0]?._id || "",
        supplier: suppliers[0]?._id || "",
      });
      setEditId("");
      clearPreview();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (product) => {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setEditId(product._id);
    setImageFile(null);
    setPreviewUrl(product.image || "");
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
      category: product.category?._id || product.category,
      supplier: product.supplier?._id || product.supplier,
    });
  };

  return (
    <div className="page section">
      <div className="container">
        <AdminTabs />
        <p className="kicker">Admin</p>
        <h1 className="section-title">Manage Products</h1>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form className="form" onSubmit={submit} style={{ maxWidth: 640 }}>
          <label htmlFor="product-name">Name</label>
          <input id="product-name" name="name" placeholder="Name" value={form.name} onChange={onChange} required />
          <label htmlFor="product-description">Description</label>
          <textarea
            id="product-description"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={onChange}
            required
          />
          <div className="form-row">
            <div>
              <label htmlFor="product-price">Price</label>
              <input id="product-price" name="price" type="number" placeholder="Price" value={form.price} onChange={onChange} required />
            </div>
            <div>
              <label htmlFor="product-stock">Stock</label>
              <input id="product-stock" name="stock" type="number" placeholder="Stock" value={form.stock} onChange={onChange} required />
            </div>
          </div>
          <label htmlFor="product-image">Image URL</label>
          <input
            id="product-image"
            name="image"
            placeholder="Image URL, or upload a file below"
            value={form.image}
            onChange={onChange}
            required={!imageFile}
          />
          <label htmlFor="product-file">Upload image (JPEG, PNG, or WebP, max 5 MB)</label>
          <input
            id="product-file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onFileChange}
          />
          {previewUrl && (
            <img className="image-preview" src={previewUrl} alt="Selected product preview" />
          )}
          <label htmlFor="product-category">Category</label>
          <select id="product-category" name="category" value={form.category} onChange={onChange}>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <label htmlFor="product-supplier">Supplier</label>
          <select id="product-supplier" name="supplier" value={form.supplier} onChange={onChange}>
            {suppliers.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <Button type="submit">{editId ? "Save changes" : "Create product"}</Button>
        </form>

        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category?.name}</td>
                <td>{product.supplier?.name}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.stock}</td>
                <td>
                  <Button variant="outline" onClick={() => startEdit(product)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
