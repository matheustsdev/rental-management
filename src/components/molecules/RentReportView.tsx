import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { RentType } from "@/types/entities/RentType";
import { RentEntity } from "@/core/domain/entities/RentEntity";
import { formatDate } from "@/utils/formatDate";
import { measureFieldsLabels } from "@/constants/MeasureFields";
import { parseISO } from "date-fns";
import { RentProductProps } from "@/core/domain/entities/RentProduct";

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
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  period: {
    fontSize: 10,
    color: COLORS.lightText,
  },
  rentContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 10,
  },
  rentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 4,
  },
  clientInfo: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.text,
  },
  rentDate: {
    fontSize: 10,
    color: COLORS.secondary,
    fontWeight: "bold",
  },
  subInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  subInfoItem: {
    fontSize: 9,
    color: COLORS.lightText,
    marginRight: 15,
  },
  table: {
    marginTop: 5,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  colProduct: {
    width: "40%",
    fontSize: 9,
    fontWeight: "bold",
  },
  colMeasures: {
    width: "60%",
    fontSize: 8,
    color: COLORS.text,
  },
  label: {
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  observations: {
    marginTop: 10,
    padding: 6,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
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

interface IRentReportViewProps {
  rents: RentType[];
  startDate: string;
  endDate: string;
}

const RentReportView: React.FC<IRentReportViewProps> = ({ rents, startDate, endDate }) => {
  const formattedPeriod = `${formatDate(parseISO(startDate), "dd/MM/yyyy")} até ${formatDate(parseISO(endDate), "dd/MM/yyyy")}`;

  return (
    <Document title={`Relatório de Aluguéis - ${formattedPeriod}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Relatório de Aluguéis</Text>
          <Text style={styles.period}>Período: {formattedPeriod}</Text>
        </View>

        {rents.map((rent) => {
          const rentEntity = new RentEntity(rent);
          const { code, clientName, rentDate, returnDate, phone, createdAt, items, internalObservations } = rentEntity;

          return (
            <View key={rent.id} style={styles.rentContainer} wrap={false}>
              <View style={styles.rentHeader}>
                <Text style={styles.clientInfo}>
                  #{code} - {clientName}
                </Text>
                <View>
                  <Text style={styles.rentDate}>Saída: {formatDate(rentDate, "dd/MM/yyyy")}</Text>
                  <Text style={styles.rentDate}>Retorno: {formatDate(returnDate, "dd/MM/yyyy")}</Text>
                </View>
              </View>

              <View style={styles.subInfo}>
                {phone && <Text style={styles.subInfoItem}>Tel: {phone}</Text>}
                <Text style={styles.subInfoItem}>
                  Cadastrado em: {createdAt ? formatDate(new Date(createdAt), "dd/MM/yyyy HH:mm") : "N/A"}
                </Text>
              </View>

              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.colProduct}>Produto</Text>
                  <Text style={styles.colMeasures}>Medidas</Text>
                </View>
                {items.map((item, index) => {
                  const labels = measureFieldsLabels[item.measureType as keyof typeof measureFieldsLabels] || {};

                  const activeMeasures = Object.entries(labels)
                    .map(([key, label]) => {
                      const value = (item as unknown as RentProductProps)[key as keyof RentProductProps];
                      if (value === null || value === undefined) return null;
                      return `${label}: ${value}`;
                    })
                    .filter(Boolean)
                    .join(" | ");

                  return (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.colProduct}>{item.productDescription}</Text>
                      <Text style={styles.colMeasures}>{activeMeasures || "Nenhuma medida necessária"}</Text>
                    </View>
                  );
                })}
              </View>

              {internalObservations && (
                <View style={styles.observations} wrap={false}>
                  <Text style={styles.obsLabel}>Observação Interna:</Text>
                  <Text style={styles.obsText}>{internalObservations}</Text>
                </View>
              )}
            </View>
          );
        })}

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages} - Gerado em ${formatDate(new Date(), "dd/MM/yyyy HH:mm")}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default RentReportView;
