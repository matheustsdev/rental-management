import { CreateProductSchema } from "@/core/application/dtos/CreateProductDTO";

describe("CreateProductSchema", () => {
  const validData = {
    reference: "PROD-001",
    description: "Product Description",
    receipt_description: "Receipt Description",
    category_id: "550e8400-e29b-41d4-a716-446655440000",
    price: 100.50,
  };

  it("should validate a correct product", () => {
    const result = CreateProductSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail if reference has less than 2 characters after trim", () => {
    const invalidData = { ...validData, reference: " A " };
    const result = CreateProductSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("A referência deve possuir no mínimo 2 caracteres");
    }
  });

  it("should fail if description has less than 2 characters after trim", () => {
    const invalidData = { ...validData, description: "B" };
    const result = CreateProductSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should fail if category_id is not a valid uuid", () => {
    const invalidData = { ...validData, category_id: "invalid-uuid" };
    const result = CreateProductSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("should fail if price is zero or negative", () => {
    const invalidData1 = { ...validData, price: 0 };
    const result1 = CreateProductSchema.safeParse(invalidData1);
    expect(result1.success).toBe(false);

    const invalidData2 = { ...validData, price: -10 };
    const result2 = CreateProductSchema.safeParse(invalidData2);
    expect(result2.success).toBe(false);
  });

  it("should allow optional/nullable receipt_description", () => {
    const data1 = { ...validData, receipt_description: undefined };
    expect(CreateProductSchema.safeParse(data1).success).toBe(true);

    const data2 = { ...validData, receipt_description: null };
    expect(CreateProductSchema.safeParse(data2).success).toBe(true);
  });
});
