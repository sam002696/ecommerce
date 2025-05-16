export const transformProductForForm = (product) => ({
  title: product?.title || "",
  price: product?.price || "",
  category_id: product?.category_id || "",
  sku: product?.sku || "",
  is_featured: product?.is_featured || "",
  status: product?.status || "",
  compare_price: product?.compare_price || "",
  description: product?.description || "",
  short_description: product?.short_description || "",
  image: product?.image_url || null,
  brand_id: product?.brand_id || "",
  qty: product?.qty || "",
  barcode: product?.barcode || "",

  sizes: product?.product_size?.map((ps) => ps.size_id) || [],
  gallery:
    product?.product_images?.map((img) => ({
      id: img.id,
      original_url: img.image_url,
      thumbnail_url: img.image_url,
      is_default: img.is_default,
      name: img.image_url.split("/").pop(),
    })) || [],
});
