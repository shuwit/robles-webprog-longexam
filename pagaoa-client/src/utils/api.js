export const unwrapProducts = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  return data.products || data.data || [];
};

export const authHeaders = (token) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const apiRequest = async (path, { method = "GET", token, body } = {}) => {
  let res;
  try {
    res = await fetch(path, {
      method,
      headers: authHeaders(token),
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Server error. Please try again later.");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const addToCartRequest = async (userInfo, productId, qty = 1) =>
  apiRequest("/api/cart", {
    method: "POST",
    token: userInfo.token,
    body: { userId: userInfo._id, productId, qty },
  });

export const formatPrice = (price) =>
  `₱${Number(price).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
