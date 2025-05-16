import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Card, RouterLink, Table, TableColumn } from "@/components/ui";
import { Extension } from "@/features/extension";
import { RootState } from "@/stores";

const idCell = (value: string) => (
  <RouterLink to="/extension/$id" params={{ id: value }}>
    {String(value).slice(0, 10)}
  </RouterLink>
);

const COLUMNS: TableColumn<Extension>[] = [
  {
    key: "id",
    label: "ID",
    className: "align-top",
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
    className: "align-top",
    props: {
      style: {
        width: "250px",
      },
    },
  },
  {
    key: "version",
    label: "Version",
    className: "align-top",
    props: {
      style: {
        width: "150px",
      },
    },
  },
  {
    key: "description",
    label: "Description",
    className: "align-top",
  },
];

function Extensions() {
  const { t } = useTranslation();

  const extensions = useSelector(
    (state: RootState) => state.extensions.extensions
  );
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
