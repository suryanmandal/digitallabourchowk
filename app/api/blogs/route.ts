import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const blogsFilePath = path.join(process.cwd(), "data", "blogs.json");

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

function getStoredBlogs(): BlogPost[] {
  try {
    if (!fs.existsSync(blogsFilePath)) {
      const dataDir = path.dirname(blogsFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(blogsFilePath, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const fileData = fs.readFileSync(blogsFilePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading blogs data:", error);
    return [];
  }
}

function saveBlogs(blogs: BlogPost[]) {
  const dataDir = path.dirname(blogsFilePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2), "utf-8");
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

// GET: Retrieve all blogs or single blog
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    const blogs = getStoredBlogs();

    if (id) {
      const single = blogs.find((b) => b.id === id);
      if (!single) {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
      }
      return NextResponse.json({ blog: single });
    }

    if (slug) {
      const single = blogs.find((b) => b.slug === slug);
      if (!single) {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
      }
      return NextResponse.json({ blog: single });
    }

    let filtered = blogs;
    if (status) {
      filtered = filtered.filter((b) => b.status === status);
    }

    return NextResponse.json({ blogs: filtered, total: filtered.length });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to retrieve blogs" }, { status: 500 });
  }
}

// POST: Create a new blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, author, excerpt, content, coverImage, status, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required fields" },
        { status: 400 }
      );
    }

    const blogs = getStoredBlogs();
    const newId = `blog-${Date.now()}`;
    const generatedSlug = slugify(body.slug || title);

    // Ensure slug uniqueness
    let finalSlug = generatedSlug;
    let counter = 1;
    while (blogs.some((b) => b.slug === finalSlug)) {
      finalSlug = `${generatedSlug}-${counter}`;
      counter++;
    }

    // Estimate reading time (average 200 words per minute)
    const wordCount = (content || "").split(/\s+/).length;
    const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const newBlog: BlogPost = {
      id: newId,
      title: title.trim(),
      slug: finalSlug,
      category: category?.trim() || "Industry News",
      author: author?.trim() || "Digital Labour Chowk Editorial",
      date: dateFormatted,
      readTime: `${readMinutes} min read`,
      coverImage: coverImage?.trim() || "/site_files/logo-tm-white.png",
      excerpt: excerpt?.trim() || (content.slice(0, 160) + "..."),
      content: content.trim(),
      status: status === "draft" ? "draft" : "published",
      views: 0,
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : [],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    // Prepend new post
    blogs.unshift(newBlog);
    saveBlogs(blogs);

    return NextResponse.json(
      { success: true, message: "Blog post published successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}

// PUT: Update an existing blog post
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, category, author, excerpt, content, coverImage, status, tags, slug } = body;

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required for update" }, { status: 400 });
    }

    const blogs = getStoredBlogs();
    const index = blogs.findIndex((b) => b.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const existing = blogs[index];
    const now = new Date();

    const wordCount = ((content ?? existing.content) || "").split(/\s+/).length;
    const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const updatedBlog: BlogPost = {
      ...existing,
      title: title ? title.trim() : existing.title,
      slug: slug ? slugify(slug) : existing.slug,
      category: category ? category.trim() : existing.category,
      author: author ? author.trim() : existing.author,
      excerpt: excerpt ? excerpt.trim() : existing.excerpt,
      content: content ? content.trim() : existing.content,
      coverImage: coverImage !== undefined ? coverImage.trim() : existing.coverImage,
      status: status ? status : existing.status,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(",").map((t: string) => t.trim())) : existing.tags,
      readTime: `${readMinutes} min read`,
      updatedAt: now.toISOString(),
    };

    blogs[index] = updatedBlog;
    saveBlogs(blogs);

    return NextResponse.json({ success: true, message: "Blog post updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("PUT /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

// DELETE: Delete a blog post
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required for deletion" }, { status: 400 });
    }

    let blogs = getStoredBlogs();
    const exists = blogs.some((b) => b.id === id);

    if (!exists) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    blogs = blogs.filter((b) => b.id !== id);
    saveBlogs(blogs);

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
