import SecondaryButton from "@/components/atoms/SecondaryButton";
import { CategoryType } from "@/types/entities/CategoryType";
import { Card, Flex, Text, Badge } from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md";

interface ICategoryCardProps {
  category: CategoryType;
  onEdit: (category: CategoryType) => void;
  onDelete: (category: CategoryType) => void;
}

const CategoryCard: React.FC<ICategoryCardProps> = ({ category, onEdit, onDelete }) => {
  const measureTypeLabels: Record<string, string> = {
    NONE: "Nenhum",
    DRESS: "Vestido",
    SUIT: "Terno/Paletó",
  };

  return (
    <Card.Root key={category.id} p="4" boxShadow="8px 8px 6px -4px rgba(0,0,0,0.20)" bg="white" borderRadius="xl">
      <Card.Header pb="2" display="flex" justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="lg">{category.name}</Text>
        <Badge colorPalette="blue" variant="solid">
           {category._count.products} prod.
        </Badge>
      </Card.Header>
      <Card.Body fontSize="sm" pb="4">
        <Flex flexDir="column" gap="1">
          <Text color="gray.600">
            <strong>Tipo de Medida:</strong> {measureTypeLabels[category.measure_type || "NONE"] || category.measure_type}
          </Text>
          <Text color="gray.600">
            <strong>Dias de Preparo:</strong> {category.post_return_buffer_days} dias
          </Text>
        </Flex>
      </Card.Body>
      <Card.Footer w="full" pt="2">
        <Flex w="full" align="center" justify="flex-end" gap="2">
          <SecondaryButton onClick={() => onEdit(category)} p="2">
            <MdEdit /> Editar
          </SecondaryButton>
          <SecondaryButton 
            onClick={() => onDelete(category)} 
            p="2" 
            colorPalette="red"
          >
            <MdDelete /> Excluir
          </SecondaryButton>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default CategoryCard;
