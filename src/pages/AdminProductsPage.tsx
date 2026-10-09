import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Product } from '../types/index';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, ArrowLeft, PackagePlus } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('Mobile Phones');
  const [subcategory, setSubcategory] = useState('Smartphones');
  const [price, setPrice] = useState(19999);
  const [stock, setStock] = useState(50);
  const [description, setDescription] = useState('');

  const loadData = async () => {
    try {
      const res = await api.getProducts({ query: search });
      setProducts(res.products || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createProduct({
        name,
        brand,
        category,
        subcategory,
        price: Number(price),
        stock_qty: Number(stock),
        description,
      });
      setIsModalOpen(false);
      setName('');
      setDescription('');
      loadData();
    } catch (err) {
      alert('Error creating product');
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/admin')} className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Console</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">Catalog Inventory Management</h2>
          <p className="text-xs text-gray-500">{products.length} products listed in active catalog</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search SKU or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 w-56 focus:outline-hidden"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-200/70 text-gray-400 font-bold uppercase text-[10px]">
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Stock</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.slice(0, 50).map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="p-3.5 flex items-center gap-3">
                    <img src={p.image_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate max-w-xs">{p.name}</p>
                      <span className="text-[10px] text-gray-400 font-mono">{p.sku} • {p.brand}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-gray-600">{p.category}</td>
                  <td className="p-3.5 font-bold text-gray-900">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="p-3.5 text-gray-700">{p.stock_qty} units</td>
                  <td className="p-3.5 font-bold text-amber-700">{p.rating} ★</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium text-[10px]">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-950 mb-4">Add New Catalogue Item</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                  >
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Headphones">Headphones</option>
                    <option value="Smartwatches">Smartwatches</option>
                    <option value="Sarees">Sarees</option>
                    <option value="Kurtis">Kurtis</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Shoes">Shoes</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
