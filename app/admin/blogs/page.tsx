"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  PlusCircle,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  X,
  ExternalLink,
  Image as ImageIcon,
  Tag,
  BookOpen
} from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string;
  status: "published" | "draft";
  views?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

const PRESET_IMAGES = [
  { label: "Bridge Construction", url: "/wp-content/uploads/2026/09/15-Tallest-Bridges-in-the-World-By-Hieght-2024-Red-Rock-Scenic-By-Way-300x200.jpeg" },
  { label: "Kallanai Dam", url: "/wp-content/uploads/2026/09/ChatGPT-Image-Sep-7-2026-02_40_39-PM-300x169.png" },
  { label: "Daily Wage Workers", url: "/wp-content/uploads/2026/09/ChatGPT-Image-Sep-7-2026-12_04_15-PM-300x169.png" },
  { label: "Tech Platform", url: "/wp-content/uploads/2026/06/ChatGPT-Image-Jun-29-2026-12_28_29-PM-300x200.png" },
  { label: "PF & ESIC", url: "/wp-content/uploads/2026/06/Gemini_Generated_Image_be24e9be24e9be24-300x167.png" },
  { label: "DLC Header", url: "/wp-content/uploads/2025/07/Website-images-768x591.png" },
];

const CATEGORIES = [
  "Infrastructure & Engineering",
  "Worker Welfare",
  "Technology & Hiring",
  "Worker Rights & Policy",
  "Company News",
  "Contractor Guides"
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Infrastructure & Engineering");
  const [formAuthor, setFormAuthor] = useState("Digital Labour Chowk Editorial");
  const [formCoverImage, setFormCoverImage] = useState(PRESET_IMAGES[0].url);
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formStatus, setFormStatus] = useState<"published" | "draft">("published");
  const [formTags, setFormTags] = useState("");
  const [previewTab, setPreviewTab] = useState<"write" | "preview">("write");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openCreateModal = () => {
    setEditingBlog(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("Infrastructure & Engineering");
    setFormAuthor("Digital Labour Chowk Editorial");
    setFormCoverImage(PRESET_IMAGES[0].url);
    setFormExcerpt("");
    setFormContent("");
    setFormStatus("published");
    setFormTags("construction, labour, dlc");
    setPreviewTab("write");
    setIsModalOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormTitle(blog.title);
    setFormSlug(blog.slug);
    setFormCategory(blog.category);
    setFormAuthor(blog.author);
    setFormCoverImage(blog.coverImage);
    setFormExcerpt(blog.excerpt);
    setFormContent(blog.content);
    setFormStatus(blog.status);
    setFormTags((blog.tags || []).join(", "));
    setPreviewTab("write");
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingBlog) {
      // Auto-generate slug
      const slugified = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormSlug(slugified);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      alert("Please provide both a Title and Content for the article.");
      return;
    }

    setSaving(true);
    try {
      if (editingBlog) {
        // Update existing
        const res = await fetch("/api/blogs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingBlog.id,
            title: formTitle,
            slug: formSlug,
            category: formCategory,
            author: formAuthor,
            coverImage: formCoverImage,
            excerpt: formExcerpt,
            content: formContent,
            status: formStatus,
            tags: formTags.split(",").map((t) => t.trim()).filter(Boolean),
          }),
        });
        const data = await res.json();
        if (data.blog) {
          setBlogs((prev) => prev.map((b) => (b.id === data.blog.id ? data.blog : b)));
          setIsModalOpen(false);
        }
      } else {
        // Create new
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle,
            slug: formSlug,
            category: formCategory,
            author: formAuthor,
            coverImage: formCoverImage,
            excerpt: formExcerpt,
            content: formContent,
            status: formStatus,
            tags: formTags.split(",").map((t) => t.trim()).filter(Boolean),
          }),
        });
        const data = await res.json();
        if (data.blog) {
          setBlogs((prev) => [data.blog, ...prev]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save article. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("Failed to delete blog post.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleToggleStatus = async (blog: BlogPost) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog.id, status: newStatus }),
      });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error("Toggle status error:", err);
    }
  };

  // Filtered List
  const filteredBlogs = blogs.filter((blog) => {
    const q = search.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(q) ||
      blog.category.toLowerCase().includes(q) ||
      blog.author.toLowerCase().includes(q) ||
      (blog.tags && blog.tags.some((t) => t.toLowerCase().includes(q)));

    if (!matchesSearch) return false;

    if (selectedCategory !== "all" && blog.category !== selectedCategory) return false;
    if (selectedStatus !== "all" && blog.status !== selectedStatus) return false;

    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0C59D4] animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Content Management System
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Blog Control & Publication Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish thought-leadership articles, worker stories, and construction industry guides.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0C59D4] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md transition active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Article</span>
          </button>
          <button
            onClick={fetchBlogs}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold shadow-xs hover:bg-slate-50 transition active:scale-95 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Total Articles
          </div>
          <div className="text-3xl font-black text-slate-900">{blogs.length}</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Published Live
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {blogs.filter((b) => b.status === "published").length}
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Drafts & Review
          </div>
          <div className="text-3xl font-black text-amber-500">
            {blogs.filter((b) => b.status === "draft").length}
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, category, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0C59D4]/20 focus:border-[#0C59D4] transition"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0C59D4]/20"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0C59D4]/20"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Blogs Grid / List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-slate-400 font-medium">Loading blog articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No blog articles found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {search || selectedCategory !== "all"
                ? "Try adjusting your filters or search keywords."
                : "Get started by creating your very first blog article to boost DLC's search presence."}
            </p>
            <button
              onClick={openCreateModal}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-[#0C59D4] text-white rounded-xl text-xs font-bold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Article</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={blog.coverImage || PRESET_IMAGES[0].url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider backdrop-blur-md ${
                          blog.status === "published"
                            ? "bg-emerald-500/90 text-white"
                            : "bg-amber-500/90 text-white"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-black/70 text-white backdrop-blur-xs">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0C59D4] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(blog)}
                      className={`text-[11px] px-2.5 py-1 rounded-md transition ${
                        blog.status === "published"
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      {blog.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(blog)}
                      className="p-2 text-slate-600 hover:text-[#0C59D4] hover:bg-blue-50 rounded-lg transition"
                      title="Edit Post"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id, blog.title)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT BLOG POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0C59D4] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    {editingBlog ? "Edit Blog Article" : "Compose New Blog Article"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {editingBlog ? `Article ID: ${editingBlog.id}` : "Publish new content directly to DLC's website"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title & Slug */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How Prefabrication is Transforming Affordable Housing in India"
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0C59D4]/20 focus:border-[#0C59D4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    URL Slug
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">/blogs/</span>
                    <input
                      type="text"
                      placeholder="how-prefabrication-is-transforming-housing"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono text-slate-600 focus:outline-none focus:border-[#0C59D4]"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Status & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0C59D4]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as "published" | "draft")}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0C59D4]"
                  >
                    <option value="published">🟢 Published (Live)</option>
                    <option value="draft">🟡 Draft (Hidden)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Author Credit
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0C59D4]"
                  />
                </div>
              </div>

              {/* Cover Image Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Cover Image URL
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="/wp-content/uploads/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0C59D4]"
                  />
                </div>
                <div className="text-[11px] text-slate-400 mb-1.5">Quick Presets:</div>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      type="button"
                      key={img.label}
                      onClick={() => setFormCoverImage(img.url)}
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition ${
                        formCoverImage === img.url
                          ? "bg-[#0C59D4] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Excerpt / Short Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="A concise 1-2 sentence teaser for search engines and article cards..."
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C59D4]/20 focus:border-[#0C59D4]"
                />
              </div>

              {/* Main Content with Write / Preview Tabs */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Article Body Content *
                  </label>
                  <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setPreviewTab("write")}
                      className={`px-3 py-1 rounded-md transition ${
                        previewTab === "write" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab("preview")}
                      className={`px-3 py-1 rounded-md transition ${
                        previewTab === "preview" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                      }`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {previewTab === "write" ? (
                  <textarea
                    rows={10}
                    required
                    placeholder="Write your article here. Supports Markdown headings (###), bullet points (-), and paragraphs..."
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0C59D4]/20 focus:border-[#0C59D4]"
                  />
                ) : (
                  <div className="w-full min-h-[240px] p-5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                    {formContent ? (
                      <div>{formContent}</div>
                    ) : (
                      <span className="text-slate-400 italic">No content typed yet.</span>
                    )}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="construction, engineering, jobs, welfare"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0C59D4]"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0C59D4] hover:bg-blue-700 text-white text-xs font-bold shadow-md transition disabled:opacity-50 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{editingBlog ? "Update Article" : "Publish Article"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
