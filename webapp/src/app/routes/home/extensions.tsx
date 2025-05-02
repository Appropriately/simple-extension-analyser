import { useTranslation } from "react-i18next";

import Card from "@/components/card";
import RouterLink from "@/components/router-link";
import Table, { TableColumn } from "@/components/table";
import { store } from "@/stores";

const idCell = (value: string) => (
  <RouterLink to={`/extension/${value}`}>
    {String(value).slice(0, 10)}
  </RouterLink>
);

const COLUMNS: TableColumn[] = [
  {
    key: "id",
    label: "ID",
    render: (value: unknown) => idCell(value as string),
    props: {
      style: {
        width: "120px",
      },
    },
  },
  {
    key: "name",
    label: "Name",
    props: {
      style: {
        width: "250px",
      },
    },
  },
  {
    key: "version",
    label: "Version",
    props: {
      style: {
        width: "150px",
      },
    },
  },
  {
    key: "description",
    label: "Description",
  },
];

function Extensions() {
  const { t } = useTranslation();

  const extensions = store.getState().extensions.extensions;
  if (Object.keys(extensions).length === 0) return null;

  return (
    <Card>
      <Card.Header>
        <h1>{t("routes.home.extensions.title")}</h1>
      </Card.Header>
      <Card.Body>
        <Table>
          <Table.Header columns={COLUMNS} />
          <Table.Body data={Object.values(extensions)} columns={COLUMNS} />
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Extensions;
