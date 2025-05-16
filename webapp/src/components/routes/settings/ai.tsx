import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Card,
  FormGroup,
  Icon,
  Input,
  Select,
  Table,
  TableColumn,
  Spinner,
  ButtonIcon,
} from "@/components/ui";
import {
  addProvider,
  newServiceFromConfig,
  ProviderConfig,
  ProviderType,
  removeProvider,
  services,
  setActiveProvider,
} from "@/features/ai";
import { useToasts } from "@/features/toasts";
import { RootState } from "@/stores/store";

interface Props {
  className?: string;
}

function AI({ className }: Props) {
  const { t } = useTranslation();
  const { error } = useToasts();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const onSetActive = async (type: ProviderType) => {
    try {
      setIsLoading(true);
      await dispatch(setActiveProvider(type));
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async (type: ProviderType) => {
    try {
      setIsLoading(true);
      await dispatch(removeProvider(type));
    } finally {
      setIsLoading(false);
    }
  };

  const COLUMNS: TableColumn<ProviderConfig>[] = [
    {
      key: "type",
      label: t("features.ai.provider.label"),
      render: (value) => {
        return t(`features.ai.provider.options.${value}`);
      },
    },
    {
      key: "apiKey",
      label: t("features.ai.apiKey.label"),
      render: (value) => {
        return (
          <span className="text-zinc-400">
            {value.slice(0, 2)}*****************{value.slice(-2)}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "",
      render: (_, item) => {
        return (
          <>
            {activeProvider?.type !== item.type && (
              <ButtonIcon
                variant="primary"
                icon="check2-circle"
                onClick={() => onSetActive(item.type)}
              />
            )}
            <ButtonIcon
              variant="danger"
              icon="trash"
              onClick={() => onDelete(item.type)}
            />
          </>
        );
      },
      props: {
        style: {
          width: "75px",
        },
      },
    },
  ];

  const providers = useSelector(({ ai }: RootState) => ai.providers);
  const activeProvider = useSelector(({ ai }: RootState) =>
    ai.providers.find((p) => p.type === ai.activeProvider)
  );

  const availableProviders = useSelector(({ ai }: RootState) =>
    (Object.keys(services) as ProviderType[]).filter(
      (type) => !ai.providers.some((p) => p.type === type)
    )
  );

  const providerType = useRef<ProviderType>(availableProviders[0]);
  const apiKey = useRef<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      if (providerType.current === null) {
        error(new Error("Provider is missing"));
        return;
      }

      if (apiKey.current === "") {
        error(new Error("API Key is missing"));
        return;
      }

      const config: ProviderConfig = {
        type: providerType.current,
        apiKey: apiKey.current,
      };

      const session = newServiceFromConfig(config);
      try {
        await session.test();
      } catch (e) {
        if (e instanceof Error) error(e);

        console.error(e);
        return;
      }

      dispatch(addProvider(config));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <Card>
        <Card.Header>
          <h1 className="flex items-center">
            <Icon icon="stars" className="inline-block me-2" />
            {t("features.ai.title")}
          </h1>
        </Card.Header>

        <Card.Body>
          {isLoading ? (
            <div className="flex items-center justify-center h-24">
              <Spinner />
            </div>
          ) : (
            <>
              {providers.length > 0 && (
                <Table className="mb-2">
                  <Table.Header columns={COLUMNS} />
                  <Table.Body columns={COLUMNS} data={providers} />
                </Table>
              )}

              {providers.length === 0 && (
                <form className="flex items-center gap-3" onSubmit={onSubmit}>
                  <FormGroup
                    label={t("features.ai.provider.label")}
                    help={t("features.ai.provider.help")}
                  >
                    <Select
                      onChange={(e) => {
                        providerType.current = e.target.value as ProviderType;
                      }}
                    >
                      {availableProviders.map((p) => (
                        <option key={p} value={p}>
                          {t(`features.ai.provider.options.${p}`, {
                            defaultValue: p,
                          })}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>

                  <FormGroup
                    label={t("features.ai.apiKey.label")}
                    help={t("features.ai.apiKey.help")}
                    className="flex-1"
                  >
                    <Input
                      placeholder={t("features.ai.apiKey.placeholder")}
                      type="password"
                      onChange={(e) => {
                        apiKey.current = e.target.value;
                      }}
                    />
                  </FormGroup>

                  <Button className="ml-auto" type="submit">
                    {t("base.add")}
                  </Button>
                </form>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default AI;
