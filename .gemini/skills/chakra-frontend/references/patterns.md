# Frontend Code Patterns

## Chakra UI v3 Usage

```tsx
import { Card, Flex, Text } from "@chakra-ui/react";

const ItemCard = ({ data }) => (
  <Card.Root p="4" bg="primary.50">
    <Card.Header fontWeight="bold">{data.title}</Card.Header>
    <Card.Body>
      <Flex flexDir="column">
        <Text>{data.description}</Text>
      </Flex>
    </Card.Body>
  </Card.Root>
);
```

## React Hook Form + Zod

```tsx
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive(),
});

type FormType = z.infer<typeof schema>;

const MyModal = ({ isOpen, onClose }) => {
  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    // API call using api.post()
  };

  return (
    <BaseFormModal methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      {/* Inputs using Hook Form registration */}
    </BaseFormModal>
  );
};
```

## Data Fetching & Loading States

```tsx
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const loadData = async (params) => {
  try {
    setIsLoading(true);
    const response = await api.get("/endpoint", { params });
    setData(response.data.data);
  } catch (error) {
    toaster.create({ type: "error", title: "Error" });
  } finally {
    setIsLoading(false);
  }
};
```
