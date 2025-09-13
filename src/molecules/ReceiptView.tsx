import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { RentType } from "@/types/entities/RentType";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  bold: {
    fontWeight: "bold",
  },
});

interface IReceiptViewProps {
  rent: RentType;
}

const ReceiptView: React.FC<IReceiptViewProps> = ({ rent }) => {
  const {
    address,
    client_name,
    rent_date,
    return_date,
    rent_products,
    total_value,
    discount_value,
    receipt_observations,
  } = rent;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Recibo de Aluguel</Text>

        <View style={styles.section}>
          <Text style={styles.bold}>Cliente: {client_name}</Text>
          {address}
        </View>

        <View style={styles.section}>
          <Text>Data do Aluguel: {rent_date}</Text>
          {return_date && <Text>Data da Devolução: {return_date}</Text>}
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.bold}>Descrição</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bold}>Qtd</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bold}>Total</Text>
            </View>
          </View>
          {rent_products.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text>{item.product_description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{item.product_price.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Total: R$ {total_value.toFixed(2)}</Text>
          {discount_value && <Text>Desconto: R$ {discount_value.toFixed(2)}</Text>}
        </View>

        {receipt_observations && (
          <View style={styles.section}>
            <Text style={styles.bold}>Observações:</Text>
            <Text>{receipt_observations}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ReceiptView;
