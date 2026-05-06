import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ProductType } from "@/types/entities/ProductType";
import { formatDate } from "@/utils/formatDate";

const COLORS = {
  primary: "#E9063B",
  secondary: "#B18E72",
  text: "#333333",
  lightText: "#666666",
  border: "#E2E8F0",
  background: "#F7FAFC",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: COLORS.white,
    color: COLORS.text,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  info: {
    fontSize: 9,
    color: COLORS.lightText,
    marginBottom: 2,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cell: {
    padding: 5,
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  headerText: {
    fontWeight: "bold",
    color: COLORS.text,
  },
  colIndex: { width: "8%", textAlign: "center" },
  colRef: { width: "15%" },
  colName: { width: "25%" },
  colDesc: { width: "37%" },
  colValue: { width: "15%", textAlign: "right", borderRightWidth: 0 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: COLORS.lightText,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
});

interface IProductReportViewProps {
  products: ProductType[];
  search?: string;
  categoryName?: string;
}

const ProductReportView: React.FC<IProductReportViewProps> = ({ products, search, categoryName }) => (
  <Document title="Relatório de Produtos">
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Relatório de Produtos</Text>
        <Text style={styles.info}>Data de geração: {formatDate(new Date(), "dd/MM/yyyy HH:mm")}</Text>
        {(search || categoryName) && (
          <Text style={styles.info}>
            Filtros: {search ? `Busca: "${search}"` : ""}{" "}
            {categoryName ? `${search ? " | " : ""}Categoria: ${categoryName}` : ""}
          </Text>
        )}
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.colIndex, styles.headerText]}>#</Text>
          <Text style={[styles.cell, styles.colName, styles.headerText]}>Produto</Text>
          <Text style={[styles.cell, styles.colRef, styles.headerText]}>Referência</Text>
          <Text style={[styles.cell, styles.colDesc, styles.headerText]}>Descrição Detalhada</Text>
          <Text style={[styles.cell, styles.colValue, styles.headerText]}>Valor</Text>
        </View>

        {products.map((product, index) => (
          <View key={product.id} style={styles.tableRow} wrap={false}>
            <Text style={[styles.cell, styles.colIndex]}>{index + 1}</Text>
            <Text style={[styles.cell, styles.colName]}>{product.description}</Text>
            <Text style={[styles.cell, styles.colRef]}>{product.reference}</Text>
            <Text style={[styles.cell, styles.colDesc]}>{product.receipt_description || "-"}</Text>
            <Text style={[styles.cell, styles.colValue]}>
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(product.price))}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ProductReportView;
