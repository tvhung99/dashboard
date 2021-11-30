export const VNDFormart = (number) =>{
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "vnd",
      }).format(number);
}