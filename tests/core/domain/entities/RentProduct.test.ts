import { RentProduct, RentProductProps } from "@/core/domain/entities/RentProduct";
import { faker } from "@faker-js/faker";

describe("RentProduct Domain Entity", () => {
  it("should store and return internalObservations correctly", () => {
    const props: RentProductProps = {
      id: faker.string.uuid(),
      productId: faker.string.uuid(),
      productPrice: 100,
      productDescription: "Test Product",
      measureType: "NONE",
      bust: null,
      waist: null,
      hip: null,
      shoulder: null,
      sleeve: null,
      height: null,
      back: null,
      internalObservations: "Ajustar barra",
    };

    const rentProduct = new RentProduct(props);

    expect(rentProduct.internalObservations).toBe("Ajustar barra");
  });

  it("should handle null internalObservations", () => {
    const props: RentProductProps = {
      id: faker.string.uuid(),
      productId: faker.string.uuid(),
      productPrice: 100,
      productDescription: "Test Product",
      measureType: "NONE",
      bust: null,
      waist: null,
      hip: null,
      shoulder: null,
      sleeve: null,
      height: null,
      back: null,
      internalObservations: null,
    };

    const rentProduct = new RentProduct(props);

    expect(rentProduct.internalObservations).toBeNull();
  });

  it("should return internalObservations in toJSON", () => {
    const props: RentProductProps = {
      id: faker.string.uuid(),
      productId: faker.string.uuid(),
      productPrice: 100,
      productDescription: "Test Product",
      measureType: "NONE",
      bust: null,
      waist: null,
      hip: null,
      shoulder: null,
      sleeve: null,
      height: null,
      back: null,
      internalObservations: "Observação de teste",
    };

    const rentProduct = new RentProduct(props);
    const json = rentProduct.toJSON();

    expect(json.internalObservations).toBe("Observação de teste");
  });
});
