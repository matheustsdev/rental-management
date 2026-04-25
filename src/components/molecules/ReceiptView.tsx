import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { RentType } from "@/types/entities/RentType";
import Currency from "@/utils/models/Currency";
import { formatDate } from "@/utils/formatDate";
import { RentEntity } from "@/core/domain/entities/RentEntity";

// Register fonts if needed, but we'll use standard ones for compatibility
// Using colors from theme.ts
const COLORS = {
  primary: "#E9063B", // primary.300
  secondary: "#B18E72", // secondary.500
  text: "#333333",
  lightText: "#666666",
  border: "#E2E8F0",
  background: "#F7FAFC",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: 0,
    backgroundColor: COLORS.white,
  },
  halfPage: {
    width: "50%",
    padding: 30,
    height: "100%",
  },
  leftHalf: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    borderRightStyle: "dashed",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingBottom: 10,
  },
  shopInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  shopDetails: {
    flexDirection: "column",
  },
  shopName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  shopContact: {
    fontSize: 8,
    color: COLORS.lightText,
  },
  receiptIdentification: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  viaLabel: {
    fontSize: 10,
    color: COLORS.lightText,
    textTransform: "uppercase",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.secondary,
    textTransform: "uppercase",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 2,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    width: 80,
    color: COLORS.text,
  },
  value: {
    fontSize: 10,
    color: COLORS.text,
    flex: 1,
  },
  table: {
    marginTop: 10,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  colIndex: { width: "10%", fontSize: 9, color: COLORS.lightText },
  colItem: { width: "65%", fontSize: 9, color: COLORS.text },
  colValue: { width: "25%", fontSize: 9, color: COLORS.text, textAlign: "right" },
  bold: { fontWeight: "bold" },

  summaryContainer: {
    marginTop: "auto",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 10,
    color: COLORS.lightText,
    width: 100,
    textAlign: "right",
    paddingRight: 10,
  },
  summaryValue: {
    fontSize: 10,
    color: COLORS.text,
    width: 80,
    textAlign: "right",
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: COLORS.primary,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.primary,
    width: 120,
    textAlign: "right",
    paddingRight: 10,
  },
  totalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.primary,
    width: 80,
    textAlign: "right",
  },
  observations: {
    marginTop: 15,
    padding: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
  },
  obsLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 2,
  },
  obsText: {
    fontSize: 8,
    color: COLORS.lightText,
    lineHeight: 1.2,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 8,
    color: COLORS.lightText,
  },
});

interface IReceiptTicketProps {
  rent: RentType;
  via: string;
  isStoreVia?: boolean;
  isLast?: boolean;
}

const ReceiptTicket: React.FC<IReceiptTicketProps> = ({ rent, via, isStoreVia, isLast }) => {
  const rentEntity = new RentEntity(rent);

  const { code, phone, address, clientName, items, internalObservations, receiptObservations } = rentEntity;

  const currentObservations = isStoreVia ? internalObservations : receiptObservations;

  return (
    <View style={[styles.halfPage, !isLast ? styles.leftHalf : {}]}>
      <View style={styles.header}>
        <View style={styles.shopInfo}>
          {/* Logo Placeholder - Can be replaced with <Image src="/path/to/logo.png" /> */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>RN</Text>
          </View>
          <View style={styles.shopDetails}>
            <Text style={styles.shopName}>Rose Noivas</Text>
            <Text style={styles.shopContact}>Telefone: (85) 2138-8542</Text>
            <Text style={styles.shopContact}>Rua Cel. Manoel Paula, 206 - Centro</Text>
            <Text style={styles.shopContact}>Maranguape - CE</Text>
          </View>
        </View>
        <View style={styles.receiptIdentification}>
          <Text style={styles.title}>RECIBO {`#${code}`}</Text>
          <Text style={styles.viaLabel}>{via}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Cliente</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>{clientName}</Text>
        </View>
        {phone && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.value}>{phone}</Text>
          </View>
        )}
        {address && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.value}>{address}</Text>
          </View>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Data do aluguel:</Text>
          <Text style={styles.value}>
            {rentEntity.createdAt ? formatDate(rentEntity.createdAt, "dd 'de' MMMM 'de' yyyy") : "Não informada"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Retirada:</Text>
          <Text style={styles.value}>{formatDate(rentEntity.rentDate, "dd 'de' MMMM 'de' yyyy")}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Devolução:</Text>
          <Text style={styles.value}>
            {rentEntity.returnDate ? formatDate(rentEntity.returnDate, "dd 'de' MMMM 'de' yyyy") : "Não informada"}
          </Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.colIndex, styles.bold]}>#</Text>
          <Text style={[styles.colItem, styles.bold]}>Item</Text>
          <Text style={[styles.colValue, styles.bold]}>Preço</Text>
        </View>
        {items.map((item, index) => (
          <View style={styles.tableRow} key={index} wrap={false}>
            <Text style={styles.colIndex}>{index + 1}</Text>
            <Text style={styles.colItem}>{item.productDescription}</Text>
            <Text style={styles.colValue}>{new Currency(item.productPrice).toString()}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>{new Currency(rentEntity.getSubtotal()).toString()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Desconto:</Text>
          <Text style={styles.summaryValue}>- {new Currency(rentEntity.getTotalDiscount()).toString()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryValue}>{new Currency(rentEntity.getTotalValue()).toString()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Sinal pago:</Text>
          <Text style={styles.summaryValue}>{new Currency(rentEntity.signalValue).toString()}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Valor Restante:</Text>
          <Text style={styles.totalValue}>{new Currency(rentEntity.getRemainingValue()).toString()}</Text>
        </View>
      </View>
      <View style={styles.observations} wrap={false}>
        <Text style={styles.obsLabel}>Observações:</Text>
        <Text style={styles.obsText}>{currentObservations ?? "Nenhuma observação."}</Text>
      </View>
      <Text style={styles.footer}>Documento gerado em {formatDate(new Date(), "dd/MM/yyyy HH:mm")}</Text>
    </View>
  );
};

interface IReceiptViewProps {
  rent: RentType;
}

const ReceiptView: React.FC<IReceiptViewProps> = ({ rent }) => {
  return (
    <Document title={`Recibo ${rent.code} - ${rent.client_name}`}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <ReceiptTicket rent={rent} via="Via do Cliente" />
        <ReceiptTicket rent={rent} via="Via da Loja" isStoreVia={true} isLast={true} />
      </Page>
    </Document>
  );
};

export default ReceiptView;
