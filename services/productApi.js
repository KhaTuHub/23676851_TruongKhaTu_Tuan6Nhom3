const API_URL =
  "https://6aba0c765b549d818d61ceb1.mockapi.io/ProductAPI";

export const getProducts = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm");
  }

  return await response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Không tìm thấy sản phẩm");
  }

  return await response.json();
};