import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { RentType } from "@/types/entities/RentType";
import Currency from "@/models/Currency";
import { formatDate } from "@/utils/formatDate";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  alignedSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    paddingLeft: 4,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  bodyText: {
    fontSize: 12,
    textAlign: "center",
  },
  simpleTable: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  table: {
    display: "flex",
    width: "100%",
    marginBottom: 10,
  },
  tableHeader: {
    width: "100%",
    margin: "auto",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
  tableRow: {
    width: "100%",
    margin: "auto",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
  },
  firstBorderedTableRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    fontSize: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    gap: 4,
    paddingLeft: 4,
    paddingVertical: 2,
  },
  borderedTableRow: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
    fontSize: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderTopWidth: "none",
    borderColor: "#000",
    gap: 4,
    paddingLeft: 4,
    paddingVertical: 2,
  },
  tableHeaderIndex: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 12,
  },
  tableHeaderItem: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#000",
    paddingLeft: 4,
    textAlign: "left",
    fontSize: 12,
  },
  tableHeaderValue: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#000",
    paddingLeft: 4,
    textAlign: "left",
    fontSize: 12,
  },
  tableColIndex: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 12,
  },
  tableColItem: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderColor: "#000",
    paddingLeft: 4,
    textAlign: "left",
    fontSize: 12,
  },
  tableColValue: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderColor: "#000",
    paddingLeft: 4,
    textAlign: "left",
    fontSize: 12,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
  main: {
    height: "75%",
    maxHeight: "75%",
    minHeight: "75%",
    width: "100%",
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
      <Page size="A5" style={styles.page}>
        <View style={styles.main}>
          <View style={styles.section}>
            <Text style={styles.title}>Recibo de Aluguel</Text>
            <Text style={styles.bodyText}>Recibo do cliente</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.firstBorderedTableRow}>
              <Text style={styles.bold}>Cliente:</Text>
              <Text style={styles.bodyText}>{client_name}</Text>
            </View>
            <View style={styles.borderedTableRow}>
              <Text style={styles.bold}>Data do Aluguel:</Text>
              <Text style={styles.bodyText}>{formatDate(new Date(rent_date), "dd 'de' MMMM")}</Text>
            </View>
            <View style={styles.borderedTableRow}>
              <Text style={styles.bold}>Data da Devolução:</Text>
              <Text style={styles.bodyText}>{return_date && formatDate(new Date(return_date), "dd 'de' MMMM")}</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableHeaderIndex}>
                <Text style={styles.bold}>#</Text>
              </View>
              <View style={styles.tableHeaderItem}>
                <Text style={styles.bold}>Item</Text>
              </View>
              <View style={styles.tableHeaderValue}>
                <Text style={styles.bold}>Valor</Text>
              </View>
            </View>
            {rent_products.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableColIndex}>
                  <Text>{index + 1}</Text>
                </View>
                <View style={styles.tableColItem}>
                  <Text>{item.product_description}</Text>
                </View>
                <View style={styles.tableColValue}>
                  <Text>{new Currency(item.product_price).toString()}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.firstBorderedTableRow}>
              <Text style={styles.bold}>Total:</Text>
              <Text style={styles.bodyText}>{new Currency(total_value).toString()}</Text>
            </View>
            <View style={styles.borderedTableRow}>
              <Text style={styles.bold}>Desconto:</Text>
              <Text style={styles.bodyText}>{discount_value && new Currency(discount_value).toString()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.firstBorderedTableRow}>
          <Text style={{ width: "100%", minHeight: "100%", height: "100%", textAlign: "left" }}>
            <Text style={styles.bold}>Observações:</Text> {" " + receipt_observations}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReceiptView;
