export const unwrapProducts = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  return data.products || [];
};

export const authHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const addToCartRequest = async (userInfo, productId, qty = 1) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: authHeaders(userInfo.token),
    body: JSON.stringify({
      userId: userInfo._id,
      productId,
      qty,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not add to cart");
  }

  return data;
};
