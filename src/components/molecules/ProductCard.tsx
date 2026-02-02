import SecondaryButton from "@/components/atoms/SecondaryButton";
import Currency from "@/models/Currency";
import { ProductType } from "@/types/entities/ProductType";
import { Card, Flex, Text } from "@chakra-ui/react";

interface IProductCardProps {
  product: ProductType;
  onEdit: (product: ProductType) => void;
}

const ProductCard: React.FC<IProductCardProps> = ({ product, onEdit }) => {
  return (
    <Card.Root key={product.id} p="4" boxShadow="8px 8px 6px -4px rgba(0,0,0,0.20)" bg="terracotta.50">
      <Card.Header pb="2" fontWeight="bold">
        {product.reference}
      </Card.Header>
      <Card.Body fontSize="sm" pb="4">
        <Flex flexDir="column">
          <Text>{product.description}</Text>
          <Text>{new Currency(product.price).toString()}</Text>
          <Text>{product.categories?.name}</Text>
        </Flex>
      </Card.Body>
      <Card.Footer w="full">
        <Flex w="full" align="center" justify="flex-start">
          <SecondaryButton onClick={() => onEdit(product)}>Editar</SecondaryButton>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
